$statusBarHtml = @"
<div class="status-bar">
    <div class="status-bar-time">9:41</div>
    <div class="status-bar-icons">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="12" y="4" width="2" height="8" rx="1" />
            <rect x="9" y="6" width="2" height="6" rx="1" />
            <rect x="6" y="3" width="2" height="9" rx="1" />
            <rect x="3" y="5" width="2" height="7" rx="1" />
        </svg>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 8.5C2 7.67 2.67 7 3.5 7h1C5.33 7 6 7.67 6 8.5v6c0 .83-.67 1.5-1.5 1.5h-1c-.83 0-1.5-.67-1.5-1.5v-6zm4.5-3c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H8c-.83 0-1.5-.67-1.5-1.5v-9zm5.5-2c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-1c-.83 0-1.5-.67-1.5-1.5v-11z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" class="battery-icon">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor"/>
            <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor"/>
            <path d="M23 4V8" stroke="currentColor" stroke-linecap="round"/>
        </svg>
    </div>
</div>
"@

$files = Get-ChildItem -Path "c:\Users\Le Minh Anh\Downloads\stitch_routine\bo suu tap theo mau" -Filter "*.html"

foreach ($file in $files) {
    if ($file.Name -eq "welcome.html") { continue }
    if ($file.Name -eq "START-HERE.html") { continue }
    if ($file.Name -eq "all-screens.html") { continue }
    if ($file.Name -eq "sitemap.html") { continue }

    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already injected
    if ($content -match "status-bar.css") {
        Write-Host "Skipping $($file.Name) - Already injected"
        continue
    }

    # Inject CSS link
    if ($content -match "</head>") {
        $content = $content -replace "</head>", "<link rel='stylesheet' href='status-bar.css'/></head>"
    }

    # Inject Status Bar HTML after body tag
    # Capture body tag with any attributes
    $content = $content -replace "(<body[^>]*>)", "`$1`n$statusBarHtml"
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Injected Status Bar into: $($file.Name)"
}

Write-Host "Status Bar Injection Complete!"
