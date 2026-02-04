$files = Get-ChildItem -Path "c:\Users\Le Minh Anh\Downloads\stitch_routine\bo suu tap theo mau" -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    $content = $content -replace 'navigation\.js', 'app-navigation.js'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nCompleted! All files now use app-navigation.js with proper IA"
