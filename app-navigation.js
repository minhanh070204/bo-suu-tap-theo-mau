const APP_ROUTES = {
    welcome: 'welcome.html',
    home: 'home-dashboard.html',

    products: {
        categories: 'categories-selection.html',
        mainCategories: 'danh-mục-chính.html',
        byColor: 'bộ-sưu-tập-theo-màu.html',
        sustainable: 'săn-item-bền-vững.html',
        detail: 'chi-tiết-sản-phẩm.html',
        cart: 'giỏ-hàng-tối-giản.html',
        checkout: 'xác-nhận-thanh-toán.html'
    },

    activities: {
        hub: 'trung-tâm-trò-chơi.html',
        luckyWheel: 'vòng-quay-may-mắn.html',
        tryOn: 'thử-đồ-ảo-(try-on).html',
        mixMatch: 'game-nối-đôi-phong-cách.html',
        wardrobeGame: 'game-sắp-xếp-tủ-đồ.html',
        aiChallenge: 'thử-thách-phối-đồ-ai.html',
        characterMakeup: 'trang-điểm-nhân-vật.html',
        leaderboard: 'bảng-xếp-hạng-tuần.html',
        streetStyle: 'bình-chọn-street-style.html',
        dailyStreak: 'chuỗi-hoạt-động-daily-streak.html',
        tiktokStreak: 'chuỗi-rực-cháy-(tiktok-style).html',
        streakGifts: 'quà-tặng-chuỗi-ngày.html'
    },

    loyalty: {
        activity: 'loyalty-activity.html',
        membership: 'hạng-thành-viên-&-đặc-quyền.html',
        benefits: 'đặc-quyền-thành-viên.html',
        vipCard: 'thẻ-vip-&-cá-nhân-1.html'
    },

    tasks: {
        list1: 'danh-sách-nhiệm-vụ-1.html',
        list2: 'danh-sách-nhiệm-vụ-2.html',
        notifications: 'thông-báo-nhiệm-vụ.html'
    },

    account: {
        profile: 'user-profile.html',
        storeFinder: 'tìm-kiếm-cửa-hàng-2.html',
        appointments: 'danh-sách-lịch-hẹn-của-tôi.html',
        bookingConfirmed: 'xác-nhận-đặt-lịch-thành-công.html',
        cancelPopup: 'popup-xác-nhận-hủy-lịch.html'
    },

    onboarding: 'khởi-đầu-tối-giản.html'
};

function navigateTo(path) {
    if (typeof path === 'string') {
        window.location.href = path;
    } else {
        console.warn('Invalid navigation path:', path);
    }
}

function goBack() {
    window.history.back();
}

function showFeedback(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 99999;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function initAppNavigation() {
    document.addEventListener('DOMContentLoaded', function () {
        const currentPage = window.location.pathname.split('/').pop();

        setupBackButtons();
        setupBottomNavigation(currentPage);
        setupHomeScreenNavigation();
        setupProductsNavigation();
        setupActivitiesNavigation();
        setupLoyaltyNavigation();
        setupAccountNavigation();
        setupTasksNavigation();
        setupInteractiveElements();

        console.log('App Navigation initialized:', currentPage);
    });
}

function setupBackButtons() {
    const backButtons = document.querySelectorAll('.material-symbols-outlined');
    backButtons.forEach(btn => {
        if (btn.textContent.trim() === 'arrow_back_ios' || btn.textContent.trim() === 'arrow_back') {
            btn.style.cursor = 'pointer';
            btn.closest('span, button, div[class*="cursor"]')?.addEventListener('click', goBack);
        }
    });
}

function setupBottomNavigation(currentPage) {
    const navLinks = document.querySelectorAll('nav a, .fixed a, footer a');

    navLinks.forEach((link, index) => {
        const text = link.textContent.toLowerCase();

        if (text.includes('trang chủ') || text.includes('home')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.home);
            });
            if (currentPage === APP_ROUTES.home) {
                link.classList.add('active');
            }
        }

        else if (text.includes('sản phẩm') || text.includes('product') || text.includes('bộ sưu tập')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.products.categories);
            });
        }

        else if (text.includes('hoạt động') || text.includes('activit')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.activities.hub);
            });
        }

        else if (text.includes('cá nhân') || text.includes('tài khoản') || text.includes('account') || text.includes('person')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.account.profile);
            });
        }

        else if (text.includes('ưu đãi') || text.includes('offer')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.loyalty.activity);
            });
        }
    });
}

function setupHomeScreenNavigation() {
    if (!window.location.pathname.includes(APP_ROUTES.home)) return;

    const buttons = document.querySelectorAll('button, a, div[class*="cursor"]');
    buttons.forEach(btn => {
        const text = btn.textContent.toLowerCase();

        if (text.includes('xem đặc quyền') || text.includes('đặc quyền của bạn')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.loyalty.membership);
            });
        }

        if (text.includes('xem tất cả') || text.includes('see all')) {
            const section = btn.closest('section');
            if (section?.textContent.includes('Bộ sưu tập') || section?.textContent.includes('Collection')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateTo(APP_ROUTES.products.byColor);
                });
            }
        }
    });

    const gridCards = document.querySelectorAll('[class*="grid"] > div, .space-y-6 > div');
    gridCards.forEach(card => {
        const text = card.textContent.toLowerCase();

        if (text.includes('lịch sử điểm')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.activity));
        }

        if (text.includes('voucher')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.activity));
        }
    });
}

function setupProductsNavigation() {
    const productCards = document.querySelectorAll('.grid > div, .aspect-\\[3\\/4\\], [class*="product"]');
    productCards.forEach(card => {
        if (card.querySelector('img') || card.style.backgroundImage) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button') && !e.target.closest('.material-symbols-outlined')) {
                    navigateTo(APP_ROUTES.products.detail);
                }
            });
        }
    });

    const categoryCards = document.querySelectorAll('[class*="category"], [class*="collection"]');
    categoryCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            navigateTo(APP_ROUTES.products.mainCategories);
        });
    });

    const addToCartButtons = document.querySelectorAll('button');
    addToCartButtons.forEach(btn => {
        const text = btn.textContent.toLowerCase();

        if (text.includes('thêm vào giỏ') || text.includes('add to cart')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showFeedback('Đã thêm vào giỏ hàng ✓');
            });
        }

        if (text.includes('mua ngay') || text.includes('buy now')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateTo(APP_ROUTES.products.cart);
            });
        }

        if (text.includes('thanh toán') || text.includes('checkout') || text.includes('đặt hàng')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(APP_ROUTES.products.checkout);
            });
        }
    });

    const cartIcon = document.querySelectorAll('.material-symbols-outlined');
    cartIcon.forEach(icon => {
        if (icon.textContent.includes('shopping_bag') || icon.textContent.includes('shopping_cart')) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => navigateTo(APP_ROUTES.products.cart));
        }
    });
}

function setupActivitiesNavigation() {
    const gameCards = document.querySelectorAll('[class*="game"], [class*="challenge"], .grid > div');
    gameCards.forEach(card => {
        const text = card.textContent.toLowerCase();

        if (text.includes('vòng quay') || text.includes('lucky wheel')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.luckyWheel));
        }

        if (text.includes('thử đồ ảo') || text.includes('try-on') || text.includes('try on')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.tryOn));
        }

        if (text.includes('nối đôi') || text.includes('mix') || text.includes('match')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.mixMatch));
        }

        if (text.includes('sắp xếp tủ') || text.includes('wardrobe')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.wardrobeGame));
        }

        if (text.includes('ai') || text.includes('phối đồ')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.aiChallenge));
        }

        if (text.includes('bảng xếp hạng') || text.includes('leaderboard') || text.includes('rank')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.leaderboard));
        }

        if (text.includes('street style') || text.includes('bình chọn')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.streetStyle));
        }

        if (text.includes('chuỗi') || text.includes('streak')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.activities.dailyStreak));
        }
    });
}

function setupLoyaltyNavigation() {
    const membershipCards = document.querySelectorAll('div[class*="membership"], div[class*="tier"]');
    membershipCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.membership));
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.textContent.toLowerCase();

        if (text.includes('đặc quyền') || text.includes('benefit')) {
            btn.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.benefits));
        }

        if (text.includes('hạng') || text.includes('tier')) {
            btn.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.membership));
        }
    });
}

function setupAccountNavigation() {
    const menuItems = document.querySelectorAll('[class*="menu"], [class*="list"] > div, .grid > div');
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();

        if (text.includes('cửa hàng') || text.includes('store') || text.includes('địa điểm')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => navigateTo(APP_ROUTES.account.storeFinder));
        }

        if (text.includes('lịch hẹn') || text.includes('appointment') || text.includes('booking')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => navigateTo(APP_ROUTES.account.appointments));
        }

        if (text.includes('thành viên') || text.includes('membership')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.membership));
        }

        if (text.includes('voucher')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => navigateTo(APP_ROUTES.loyalty.activity));
        }
    });
}

function setupTasksNavigation() {
    const taskCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                showFeedback('Hoàn thành nhiệm vụ +50 điểm! 🎉');
            }
        });
    });

    const taskCards = document.querySelectorAll('[class*="task"]');
    taskCards.forEach(card => {
        if (!card.querySelector('input')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => navigateTo(APP_ROUTES.tasks.notifications));
        }
    });
}

function setupInteractiveElements() {
    const favoriteIcons = document.querySelectorAll('.material-symbols-outlined');
    favoriteIcons.forEach(icon => {
        if (icon.textContent.includes('favorite')) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const isFilled = icon.style.fontVariationSettings?.includes("'FILL' 1");
                icon.style.fontVariationSettings = isFilled ? "'FILL' 0" : "'FILL' 1";
                showFeedback(isFilled ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích ❤️');
            });
        }

        if (icon.textContent.includes('notifications') || icon.textContent.includes('notification')) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => navigateTo(APP_ROUTES.tasks.notifications));
        }

        if (icon.textContent.includes('search')) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => showFeedback('Tìm kiếm...'));
        }
    });

    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(radio => {
        radio.addEventListener('change', () => {
            showFeedback('Đã cập nhật lựa chọn ✓');
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showFeedback('Đã gửi thông tin thành công ✓');
        });
    });

    const horizontalScrollAreas = document.querySelectorAll('[class*="overflow-x"], [class*="hide-scrollbar"]');
    horizontalScrollAreas.forEach(area => {
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
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;
document.head.appendChild(style);

initAppNavigation();
