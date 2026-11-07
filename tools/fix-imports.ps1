# Fix imports in all page files after migration
$projectRoot = "C:\Users\KIMO\Documents\X5Coder Projects\PDF Stodio\pdf-stodio"
$projectDir = "$projectRoot\projects\default"

# Fix import for ds
Get-ChildItem -Path "$projectDir\page*" -Filter "page.jsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "from '../ds/index\.js'", "from '../../../src/ds/index.js'"
    $content = $content -replace "from '\.\./ds/index\.js'", "from '../../../src/ds/index.js'"
    Set-Content $_.FullName $content -NoNewline
    Write-Host "Fixed imports in $($_.FullName)"
}

Write-Host "All imports fixed!"
