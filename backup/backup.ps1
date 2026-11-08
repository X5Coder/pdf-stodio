<#
    Backup — يضغط أي فولدر تختاره إلى ملف ZIP ويحفظه في فولدر backup.

    الاستخدام:
      backup.bat                          نافذة اختيار الفولدر (دبل كليك)
      backup.bat -Path "C:\path\to\dir"   بدون نافذة
      backup.bat -Path "..." -All         بدون استثناءات (node_modules / .git / dist / out)
      backup.bat -Path "..." -Open        يفتح مكان الملف بعد الانتهاء

    ملاحظات:
      - لو اخترت فولدر جوّاه فولدر backup، الـ ZIP نفسه بيتستثنى تلقائيًا (مفيش تضمين ذاتي).
      - الملفات المقفولة (مستخدمة من برنامج تاني) بتتخطى وتظهر في التقرير بدل ما العملية تفشل.
#>
[CmdletBinding()]
param(
    [string]$Path,
    [string]$OutDir,
    [switch]$All,
    [switch]$Open
)

trap {
    Write-Host ''
    Write-Host ('  ✗ ' + $_.Exception.Message) -ForegroundColor Red
    Write-Host ''
    exit 1
}

$ErrorActionPreference = 'Stop'
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $OutDir) { $OutDir = $scriptDir }
if (-not (Test-Path -LiteralPath $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
$OutDir = (Resolve-Path -LiteralPath $OutDir).Path

function Pick-Folder {
    try {
        Add-Type -AssemblyName System.Windows.Forms
        $dlg = New-Object System.Windows.Forms.FolderBrowserDialog
        $dlg.Description = 'اختر الفولدر اللي عايز تعمله نسخة احتياطية (ZIP)'
        $dlg.ShowNewFolderButton = $false
        if ($dlg.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { return $dlg.SelectedPath }
        return $null
    } catch {
        return $null
    }
}

function Format-Size([long]$bytes) {
    if ($bytes -ge 1GB) { return ('{0:N2} GB' -f ($bytes / 1GB)) }
    if ($bytes -ge 1MB) { return ('{0:N1} MB' -f ($bytes / 1MB)) }
    if ($bytes -ge 1KB) { return ('{0:N0} KB' -f ($bytes / 1KB)) }
    return "$bytes B"
}

# ---------- اختيار الفولدر ----------
if (-not $Path) {
    Write-Host ''
    Write-Host '  Backup — اضغط أي فولدر إلى ZIP' -ForegroundColor Cyan
    Write-Host '  --------------------------------' -ForegroundColor DarkGray
    $Path = Pick-Folder
    if (-not $Path) {
        Write-Host '  اتحذف / مفيش فولدر متحدد.' -ForegroundColor Yellow
        exit 1
    }
}

if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
    throw "الفولدر مش موجود: $Path"
}

$target = (Resolve-Path -LiteralPath $Path).Path
$target = $target.TrimEnd([char[]]@('\', '/'))

if ($target -eq $OutDir) { throw 'الفولدر المختار هو نفسه فولدر backup — اختر فولدر تاني.' }
if ($target -eq [System.IO.Path]::GetPathRoot($target).TrimEnd([char[]]@('\', '/'))) {
    throw 'مينفعش تعمل نسخة احتياطية للقرص كله — اختر فولدر جوّاه.'
}

# ---------- تجهيز المسار ----------
$leaf = Split-Path -Leaf $target
if (-not $leaf) { $leaf = 'drive' }
$safeName = ($leaf -replace '[\\/:*?"<>|]', '_').Trim()
if (-not $safeName) { $safeName = 'backup' }
$stamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$zipPath = Join-Path $OutDir ("{0}_{1}.zip" -f $safeName, $stamp)
$n = 2
while (Test-Path -LiteralPath $zipPath) {
    $zipPath = Join-Path $OutDir ("{0}_{1}-{2}.zip" -f $safeName, $stamp, $n)
    $n++
}

# ---------- استثناءات ----------
$skipNames = @('node_modules', '.git', 'dist', 'out', '.vite', '.cache')
$excludeRoots = @($OutDir)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$rootLen = $target.Length
$allFiles = @(Get-ChildItem -LiteralPath $target -Recurse -Force -File -ErrorAction SilentlyContinue)
$files = @($allFiles | Where-Object {
    $full = $_.FullName
    if ($_.Attributes -band [System.IO.FileAttributes]::ReparsePoint) { return $false }
    foreach ($ex in $excludeRoots) {
        if ($full.StartsWith($ex, [System.StringComparison]::OrdinalIgnoreCase)) { return $false }
    }
    if (-not $All) {
        $rel = $full.Substring($rootLen).TrimStart([char[]]@('\', '/'))
        foreach ($seg in ($rel -split '[\\/]')) {
            if ($skipNames -contains $seg) { return $false }
        }
    }
    return $true
})

Write-Host ''
Write-Host ('  المصدر : ' + $target) -ForegroundColor Gray
Write-Host ('  الهدف  : ' + $zipPath) -ForegroundColor Gray
Write-Host ('  الملفات: ' + $files.Count + ' ملف') -ForegroundColor Gray
Write-Host ''

# ---------- الضغط ----------
$zip = $null
$count = 0
$rawBytes = 0L
$skipped = New-Object System.Collections.Generic.List[string]
$sw = [System.Diagnostics.Stopwatch]::StartNew()

try {
    $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
    foreach ($f in $files) {
        $rel = $f.FullName.Substring($rootLen).TrimStart([char[]]@('\', '/')) -replace '\\', '/'
        try {
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $zip, $f.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal)
            $count++
            $rawBytes += $f.Length
        } catch {
            $skipped.Add($rel)
        }
        if ($count -gt 0 -and $count % 50 -eq 0) {
            Write-Progress -Activity 'جاري الضغط' -Status ("{0} / {1} ملف" -f $count, $files.Count)
        }
    }
} catch {
    if ($zip) { try { $zip.Dispose() } catch {} }
    if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force -ErrorAction SilentlyContinue }
    throw
} finally {
    if ($zip) { $zip.Dispose() }
    Write-Progress -Activity 'جاري الضغط' -Completed
    $sw.Stop()
}

$zipSize = (Get-Item -LiteralPath $zipPath).Length
$ratio = if ($rawBytes -gt 0) { [math]::Round((1 - ($zipSize / $rawBytes)) * 100, 1) } else { 0 }
if ($ratio -lt 0) { $ratio = 0 }

Write-Host '  تم بنجاح ✓' -ForegroundColor Green
Write-Host ('  الملف    : ' + (Split-Path -Leaf $zipPath)) -ForegroundColor Green
Write-Host ('  المحتوى  : ' + $count + ' ملف (' + (Format-Size $rawBytes) + ' قبل الضغط)') -ForegroundColor Gray
Write-Host ('  الحجم    : ' + (Format-Size $zipSize) + '  ·  توفير ' + $ratio + '%') -ForegroundColor Gray
Write-Host ('  المدة    : ' + ('{0:N1}s' -f $sw.Elapsed.TotalSeconds)) -ForegroundColor DarkGray
if ($skipped.Count -gt 0) {
    Write-Host ('  تم تخطي ' + $skipped.Count + ' ملف (مقفول أو غير متاح):') -ForegroundColor Yellow
    $skipped | Select-Object -First 8 | ForEach-Object { Write-Host ('    - ' + $_) -ForegroundColor DarkYellow }
}
Write-Host ('  المكان   : ' + $OutDir) -ForegroundColor Gray
Write-Host ''

if ($Open) { Start-Process explorer.exe -ArgumentList ('/select,"' + $zipPath + '"') }
