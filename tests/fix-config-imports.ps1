# Fix config imports in all page files
$projectRoot = "C:\Users\KIMO\Documents\X5Coder Projects\PDF Stodio\pdf-stodio"
$projectDir = "$projectRoot\projects\default"

# Fix import for config to use @/config
Get-ChildItem -Path "$projectDir\page*" -Filter "page.jsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "from '\.\./config\.js'", "from '@/config.js'"
    Set-Content $_.FullName $content -NoNewline
    Write-Host "Fixed config import in $($_.FullName)"
}

Write-Host "All config imports fixed!"
