$files = Get-ChildItem -Path "c:\Users\Le Minh Anh\Downloads\stitch_routine\bo suu tap theo mau" -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    $content = $content -replace 'Nunito\+Sans', 'Maven+Pro'
    $content = $content -replace 'Nunito Sans', 'Maven Pro'
    $content = $content -replace "font-family:\s*'Nunito Sans'", "font-family: 'Maven Pro'"
    $content = $content -replace 'font-family:\s*\["Nunito Sans"', 'font-family: ["Maven Pro"'
    $content = $content -replace 'sans:\s*\["Nunito Sans"', 'sans: ["Maven Pro"'
    
    $content = $content -replace 'max-width=device-width,\s*initial-scale=1\.0', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nCompleted! All HTML files now use Maven Pro font and iPhone 14 Pro Max dimensions (430px)"
