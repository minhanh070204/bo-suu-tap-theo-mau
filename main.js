document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION LOGIC ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view-section');
    const welcomeScreen = document.getElementById('welcome-screen');
    const exploreBtn = document.getElementById('btn-explore');

    // 1. Handle Welcome Screen
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // Smoothly fade out welcome
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                // Navigate to Home dashboard automatically
                switchTab('home');
            }, 500);
        });
    }

    // 2. Handle Bottom Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').replace('#', '');
            switchTab(targetId);
        });
    });

    // Function to switch tabs
    window.switchTab = (tabId) => {
        console.log('Switching to:', tabId);

        // Hide all views
        views.forEach(view => {
            view.classList.add('hidden');
        });

        // Show target view
        const targetView = document.getElementById(`view-${tabId}`);
        if (targetView) targetView.classList.remove('hidden');

        // Update Nav State
        navItems.forEach(nav => {
            nav.classList.remove('active');
            // Check if icons need to switch style? (Material Icons don't change class usually for filled, but we change color)
            if (nav.getAttribute('href') === `#${tabId}`) {
                nav.classList.add('active');
            }
        });

        // Scroll top
        window.scrollTo(0, 0);
    };

    // --- GAME LOGIC ---
    window.finishGame = () => {
        const popup = document.getElementById('reward-popup');
        if (popup) popup.classList.add('active');
    };

    window.hideReward = () => {
        const popup = document.getElementById('reward-popup');
        if (popup) popup.classList.remove('active');
        // Navigate back to shopping screen
        switchTab('products');
    };

});
