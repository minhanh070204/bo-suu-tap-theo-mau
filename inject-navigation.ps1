$files = Get-ChildItem -Path "c:\Users\Le Minh Anh\Downloads\stitch_routine\bo suu tap theo mau" -Filter "*.html"
$scriptTag = "`n<script src=`"navigation.js`"></script>`n</body>"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -notmatch 'navigation\.js') {
        $content = $content -replace '</body>', $scriptTag
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "Skipped (already has navigation.js): $($file.Name)"
    }
}

Write-Host "`nCompleted! All HTML files have been updated with navigation.js"
