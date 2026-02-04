$navHtml = @"
<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-6 z-[99999]" style="max-width: 430px; margin: 0 auto; padding-bottom: calc(env(safe-area-inset-bottom) + 16px);">
    <nav class="flex justify-between items-end">
        <a href="home-dashboard.html" class="nav-item flex flex-col items-center gap-1.5 flex-1 group" data-page="home">
            <span class="material-symbols-outlined text-[26px] font-light transition-colors duration-200">home</span>
            <span class="text-[9px] font-bold uppercase tracking-widest transition-colors duration-200">Trang chủ</span>
        </a>
        <a href="categories-selection.html" class="nav-item flex flex-col items-center gap-1.5 flex-1 group" data-page="products">
            <span class="material-symbols-outlined text-[26px] font-light transition-colors duration-200">checkroom</span>
            <span class="text-[9px] font-bold uppercase tracking-widest transition-colors duration-200">Sản phẩm</span>
        </a>
        <a href="loyalty-activity.html" class="nav-item flex flex-col items-center gap-1.5 flex-1 group" data-page="activities">
            <span class="material-symbols-outlined text-[26px] font-light transition-colors duration-200">bar_chart</span>
            <span class="text-[9px] font-bold uppercase tracking-widest transition-colors duration-200">Hoạt động</span>
        </a>
        <a href="user-profile.html" class="nav-item flex flex-col items-center gap-1.5 flex-1 group" data-page="account">
            <span class="material-symbols-outlined text-[26px] font-light transition-colors duration-200">person</span>
            <span class="text-[9px] font-bold uppercase tracking-widest transition-colors duration-200">Tài khoản</span>
        </a>
    </nav>
    
    <!-- Home Indicator -->
    <div class="h-1 w-32 bg-gray-300 rounded-full mx-auto mt-4"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const page = item.getAttribute('data-page');
        let isActive = false;

        if (page === 'home' && (currentPath.includes('home-dashboard') || currentPath.endsWith('/index.html') || currentPath.endsWith('/'))) isActive = true;
        if (page === 'products' && (currentPath.includes('product') || currentPath.includes('categor') || currentPath.includes('cart') || currentPath.includes('check'))) isActive = true;
        if (page === 'activities' && (currentPath.includes('activity') || currentPath.includes('loyalty') || currentPath.includes('game') || currentPath.includes('streak') || currentPath.includes('leaderboard'))) isActive = true;
        if (page === 'account' && (currentPath.includes('profile') || currentPath.includes('user') || currentPath.includes('settings') || currentPath.includes('store'))) isActive = true;

        const icon = item.querySelector('.material-symbols-outlined');
        const text = item.querySelector('span:last-child');

        if (isActive) {
            icon.classList.add('text-black');
            text.classList.add('text-black');
            icon.classList.remove('text-gray-400');
            text.classList.remove('text-gray-400');
        } else {
            icon.classList.add('text-gray-400');
            text.classList.add('text-gray-400');
            icon.classList.remove('text-black');
            text.classList.remove('text-black');
        }
    });
});
</script>
"@

$files = Get-ChildItem -Path "c:\Users\Le Minh Anh\Downloads\stitch_routine\bo suu tap theo mau" -Filter "*.html"

foreach ($file in $files) {
    if ($file.Name -eq "welcome.html") { continue }
    if ($file.Name -eq "START-HERE.html") { continue }
    if ($file.Name -eq "all-screens.html") { continue }
    if ($file.Name -eq "sitemap.html") { continue }

    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 1. CLEANUP: Remove ANY existing nav block (old or new) to start fresh
    # Remove the logic I injected previously (identified by the script block)
    if ($content -match '(?s)<div class="fixed bottom-0.*?Home Indicator.*?</div>\s*<script>.*?document.addEventListener\(''DOMContentLoaded''.*?</script>') {
        $content = $content -replace '(?s)<div class="fixed bottom-0.*?Home Indicator.*?</div>\s*<script>.*?document.addEventListener\(''DOMContentLoaded''.*?</script>', ''
        Write-Host "Cleaned previous injection in $($file.Name)"
    }
    
    # Remove the ORIGINAL old footer navigation
    # Pattern: <nav class="fixed bottom-0 ..."> ... </nav> ... <div ... rounded-full ...></div>
    if ($content -match '(?s)<nav class="fixed bottom-0.*?</nav>\s*<div.*?fixed bottom-1.*?</div>') {
        $content = $content -replace '(?s)<nav class="fixed bottom-0.*?</nav>\s*<div.*?fixed bottom-1.*?</div>', ''
        Write-Host "Removed original nav in $($file.Name)"
    }
    # Fallback for old footer without the indicator div or different structure
    if ($content -match '(?s)<nav class="fixed bottom-0.*?</nav>') {
         $content = $content -replace '(?s)<nav class="fixed bottom-0.*?</nav>', ''
         Write-Host "Removed generic nav in $($file.Name)"
    }

    # 2. INJECT NEW NAV at the end of body
    # Using regex to insert before closure or script includes
    
    if ($content -match '<script src="app-navigation.js"></script>') {
        $content = $content -replace '<script src="app-navigation.js"></script>', "$navHtml`n<script src='app-navigation.js'></script>"
    } elseif ($content -match '</body>') {
        $content = $content -replace '</body>', "$navHtml`n</body>"
    }
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
}

Write-Host "Navigation update complete!"
