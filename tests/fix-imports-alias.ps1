# Fix imports to use @ds alias
$projectRoot = "C:\Users\KIMO\Documents\X5Coder Projects\PDF Stodio\pdf-stodio"
$projectDir = "$projectRoot\projects\default"

# Fix import for ds to use @ds alias
Get-ChildItem -Path "$projectDir\page*" -Filter "page.jsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "from '\.\./\.\./\.\./src/ds/index\.js'", "from '@ds/index.js'"
    $content = $content -replace "from '../../../src/ds/index\.js'", "from '@ds/index.js'"
    Set-Content $_.FullName $content -NoNewline
    Write-Host "Fixed imports in $($_.FullName)"
}

Write-Host "All imports fixed with @ds alias!"
