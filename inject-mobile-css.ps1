$files = Get-ChildItem -Path "c:\Users\Le Minh Anh\Downloads\stitch_routine\bo suu tap theo mau" -Filter "*.html"
$cssLink = '<link rel="stylesheet" href="mobile.css"/>'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -notmatch 'mobile\.css') {
        $content = $content -replace '</head>', "$cssLink`n</head>"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Added mobile.css to: $($file.Name)"
    } else {
        Write-Host "Skipped (already has mobile.css): $($file.Name)"
    }
}

Write-Host "`nCompleted! All HTML files are now mobile-only responsive (480px max-width)"
