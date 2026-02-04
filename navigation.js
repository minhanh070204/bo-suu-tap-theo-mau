const routes = {
    'home': 'home-dashboard.html',
    'collection': 'bộ-sưu-tập-theo-màu.html',
    'categories': 'categories-selection.html',
    'product-detail': 'chi-tiết-sản-phẩm.html',
    'cart': 'giỏ-hàng-tối-giản.html',
    'checkout': 'xác-nhận-thanh-toán.html',
    'profile': 'user-profile.html',
    'loyalty': 'loyalty-activity.html',
    'games': 'trung-tâm-trò-chơi.html',
    'leaderboard': 'bảng-xếp-hạng-tuần.html',
    'tasks': 'danh-sách-nhiệm-vụ-1.html',
    'store-finder': 'tìm-kiếm-cửa-hàng-2.html',
    'membership': 'hạng-thành-viên-&-đặc-quyền.html',
    'appointments': 'danh-sách-lịch-hẹn-của-tôi.html',
    'sustainable': 'săn-item-bền-vững.html',
    'try-on': 'thử-đồ-ảo-(try-on).html',
    'wheel': 'vòng-quay-may-mắn.html',
    'street-style': 'bình-chọn-street-style.html',
    'wardrobe-game': 'game-sắp-xếp-tủ-đồ.html',
    'matching-game': 'game-nối-đôi-phong-cách.html',
    'ai-challenge': 'thử-thách-phối-đồ-ai.html',
    'streak': 'chuỗi-hoạt-động-daily-streak.html',
    'gifts': 'quà-tặng-chuỗi-ngày.html',
    'notifications': 'thông-báo-nhiệm-vụ.html',
    'onboarding': 'khởi-đầu-tối-giản.html'
};

function navigate(route) {
    if (routes[route]) {
        window.location.href = routes[route];
    } else {
        console.warn('Route not found:', route);
    }
}

function goBack() {
    window.history.back();
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#000;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function initNavigation() {
    document.addEventListener('DOMContentLoaded', function () {

        const backBtns = document.querySelectorAll('[data-nav="back"], .material-symbols-outlined');
        backBtns.forEach(btn => {
            if (btn.textContent && btn.textContent.includes('arrow_back')) {
                btn.style.cursor = 'pointer';
                btn.addEventListener('click', goBack);
            }
        });

        const navLinks = document.querySelectorAll('[data-nav]');
        navLinks.forEach(link => {
            const route = link.getAttribute('data-nav');
            if (route && route !== 'back') {
                link.style.cursor = 'pointer';
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigate(route);
                });
            }
        });

        const bottomNav = document.querySelectorAll('nav a, .fixed a, footer a');
        if (bottomNav.length >= 4) {
            bottomNav[0]?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
            bottomNav[1]?.addEventListener('click', (e) => { e.preventDefault(); navigate('collection'); });
            bottomNav[2]?.addEventListener('click', (e) => { e.preventDefault(); navigate('loyalty'); });
            bottomNav[3]?.addEventListener('click', (e) => { e.preventDefault(); navigate('profile'); });
        }

        const productCards = document.querySelectorAll('.grid > div, [class*="product"], .aspect-\\[3\\/4\\]');
        productCards.forEach(card => {
            const hasButton = card.querySelector('button');
            if (hasButton || card.querySelector('img')) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('button') && !e.target.closest('.material-symbols-outlined')) {
                        navigate('product-detail');
                    }
                });
            }
        });

        const addToCartBtns = document.querySelectorAll('button');
        addToCartBtns.forEach(btn => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('thêm') || text.includes('giỏ') || text.includes('cart')) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showToast('Đã thêm vào giỏ hàng');
                });
            }
            if (text.includes('đặt hàng') || text.includes('thanh toán') || text.includes('checkout')) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigate('checkout');
                });
            }
            if (text.includes('xem') && text.includes('đặc quyền')) {
                btn.addEventListener('click', () => navigate('membership'));
            }
            if (text.includes('xem tất cả')) {
                btn.addEventListener('click', () => navigate('collection'));
            }
        });

        const favoriteIcons = document.querySelectorAll('.material-symbols-outlined');
        favoriteIcons.forEach(icon => {
            if (icon.textContent.includes('favorite')) {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    icon.style.fontVariationSettings = icon.style.fontVariationSettings === "'FILL' 1" ? "'FILL' 0" : "'FILL' 1";
                    showToast('Đã cập nhật yêu thích');
                });
            }
            if (icon.textContent.includes('search')) {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', () => {
                    showToast('Tìm kiếm');
                });
            }
            if (icon.textContent.includes('shopping_bag') || icon.textContent.includes('shopping_cart')) {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', () => navigate('cart'));
            }
            if (icon.textContent.includes('notifications')) {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', () => navigate('notifications'));
            }
        });

        const colorRadios = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        colorRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                showToast('Đã cập nhật lựa chọn');
            });
        });

        const gameCards = document.querySelectorAll('[class*="game"], [class*="challenge"]');
        gameCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes('sắp xếp')) navigate('wardrobe-game');
                else if (cardText.includes('nối')) navigate('matching-game');
                else if (cardText.includes('ai')) navigate('ai-challenge');
                else if (cardText.includes('quay')) navigate('wheel');
                else navigate('games');
            });
        });

        const appointmentCards = document.querySelectorAll('[class*="appointment"], [class*="lịch"]');
        appointmentCards.forEach(card => {
            card.style.cursor = 'pointer';
            const cancelBtn = card.querySelector('button');
            if (cancelBtn && cancelBtn.textContent.includes('Hủy')) {
                cancelBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showToast('Đã hủy lịch hẹn');
                });
            }
        });

        const leaderboardItems = document.querySelectorAll('[class*="rank"], [class*="leaderboard"]');
        leaderboardItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => navigate('leaderboard'));
        });

        const taskItems = document.querySelectorAll('[class*="task"], [class*="nhiệm vụ"]');
        taskItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        showToast('Hoàn thành nhiệm vụ +50 điểm');
                    }
                });
            }
        });

        const voucherCards = document.querySelectorAll('[class*="voucher"], [class*="coupon"]');
        voucherCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => showToast('Đã sao chép mã voucher'));
        });

        const wheelBtn = document.querySelector('[class*="wheel"], [class*="quay"]');
        if (wheelBtn) {
            wheelBtn.addEventListener('click', () => {
                showToast('Đang quay...');
                setTimeout(() => showToast('Chúc mừng! Bạn nhận được voucher 50K'), 2000);
            });
        }

        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Đã gửi thông tin');
            });
        });

        const swipeAreas = document.querySelectorAll('[class*="overflow-x"], [class*="scroll"]');
        swipeAreas.forEach(area => {
            area.style.cursor = 'grab';
            let isDown = false;
            let startX, scrollLeft;
            area.addEventListener('mousedown', (e) => {
                isDown = true;
                area.style.cursor = 'grabbing';
                startX = e.pageX - area.offsetLeft;
                scrollLeft = area.scrollLeft;
            });
            area.addEventListener('mouseleave', () => {
                isDown = false;
                area.style.cursor = 'grab';
            });
            area.addEventListener('mouseup', () => {
                isDown = false;
                area.style.cursor = 'grab';
            });
            area.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - area.offsetLeft;
                const walk = (x - startX) * 2;
                area.scrollLeft = scrollLeft - walk;
            });
        });

        console.log('Navigation initialized with all events');
    });
}

initNavigation();
