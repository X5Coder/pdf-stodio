# Script to migrate existing pages to new project structure
$projectRoot = "C:\Users\KIMO\Documents\X5Coder Projects\PDF Stodio\pdf-stodio"
$pagesDir = "$projectRoot\src\pages"
$projectDir = "$projectRoot\projects\default"

# Create page folders 1-40
for ($i = 1; $i -le 40; $i++) {
    $pageNum = $i.ToString("00")
    $pageDir = "$projectDir\page$pageNum"
    $sourceFile = "$pagesDir\Page$pageNum.jsx"
    $destFile = "$pageDir\page.jsx"

    # Create page directory
    if (-not (Test-Path $pageDir)) {
        New-Item -ItemType Directory -Path $pageDir -Force | Out-Null
    }

    # Create images subdirectory
    $imagesDir = "$pageDir\images"
    if (-not (Test-Path $imagesDir)) {
        New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
    }

    # Copy page file if exists
    if (Test-Path $sourceFile) {
        Copy-Item $sourceFile $destFile -Force
        Write-Host "Copied Page$pageNum.jsx to page$pageNum\page.jsx"
    } else {
        Write-Host "Warning: Page$pageNum.jsx not found"
    }
}

Write-Host "Migration complete!"
