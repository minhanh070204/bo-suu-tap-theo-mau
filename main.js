// --- DATA: PRODUCTS ---
const PRODUCTS = {
    nam: [
        { id: 'm1', name: 'ÁO NỈ ĐỎ THÊU HỌA TIẾT', price: 650000, img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600', category: 'Nam', product_type: 'Áo' },
        { id: 'm2', name: 'QUẦN TÂY SLIM FIT', price: 650000, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600', category: 'Nam', product_type: 'Quần' },
        { id: 'm3', name: 'ÁO POLO COTTON TRƠN', price: 390000, img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600', category: 'Nam', product_type: 'Áo' },
        { id: 'm4', name: 'QUẦN SHORT KAKI', price: 450000, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600', category: 'Nam', product_type: 'Quần' }
    ],
    nu: [
        { id: 'w1', name: 'ÁO THUN COTTON NỮ', price: 290000, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600', category: 'Nữ', product_type: 'Áo' },
        { id: 'w2', name: 'QUẦN JEAN SUÔNG', price: 750000, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600', category: 'Nữ', product_type: 'Quần' },
        { id: 'w3', name: 'ÁO SƠ MI FORM RỘNG', price: 590000, img: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?q=80&w=600', category: 'Nữ', product_type: 'Áo' },
        { id: 'w4', name: 'CHÂN VÁY MIDI XẾP LY', price: 690000, img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=600', category: 'Nữ', product_type: 'Chân váy' }
    ]
};

function validateProducts() {
    console.log("MANDATORY VALIDATION: Checking product-image consistency...");
    for (const key in PRODUCTS) {
        PRODUCTS[key].forEach(p => {
            const nameLower = p.name.toLowerCase();
            const typeLower = p.product_type.toLowerCase();

            // Validate name vs type
            if ((nameLower.includes('áo') && typeLower !== 'áo') ||
                (nameLower.includes('quần') && typeLower !== 'quần') ||
                (nameLower.includes('váy') && !['váy', 'chân váy'].includes(typeLower))) {
                console.error(`VALIDATION FAILURE: Mismatch in product ${p.id} - Name: ${p.name}, Type: ${p.product_type}`);
            }

            // Validate category
            const allowedCategories = ['Nam', 'Nữ', 'Bộ sưu tập'];
            if (!allowedCategories.includes(p.category)) {
                console.error(`VALIDATION FAILURE: Invalid category for ${p.id}`);
            }
        });
    }
}

// --- STATE ---
let currentCart = [];
let currentProduct = null;
let userPoints = 1250;
let userVouchers = [{ name: 'ROUTINE WELCOME', value: '10% OFF', amount: 0.1, date: '30/12/2026' }];
let appliedVoucher = null;

// --- DOM ELEMENTS ---
const views = ['home', 'shop', 'loyalty', 'stores', 'account'];
const overlays = ['product-detail', 'cart', 'checkout', 'success', 'wheel', 'game-hub', 'order-history', 'personal-info', 'policies', 'voucher-select', 'tiers', 'booking', 'booking-success'];

// --- MOCK DATA ---
const ORDERS = [
    { id: 'ROUTINE-99120', date: '09/02/2026', total: 650000, status: 'Đang giao' },
    { id: 'ROUTINE-98441', date: '20/01/2026', total: 1250000, status: 'Đã hoàn thành' }
];

// --- ACCOUNT FUNCTIONS ---
function showOrderHistory() {
    const list = document.getElementById('order-list-content');
    list.innerHTML = ORDERS.map(o => `
        <div class="card mb-3">
            <div class="flex justify-between mb-2">
                <p class="text-xs font-bold">${o.id}</p>
                <p class="text-xs" style="color: ${o.status === 'Đang giao' ? '#2e7d32' : '#757575'}">${o.status}</p>
            </div>
            <div class="flex justify-between">
                <p class="text-xs text-gray">${o.date}</p>
                <p class="text-sm font-bold">${o.total.toLocaleString()}đ</p>
            </div>
        </div>
    `).join('');
    openOverlay('order-history');
}

function showPersonalInfo() {
    openOverlay('personal-info');
}

function showPolicies() {
    openOverlay('policies');
}

function showTiers() {
    openOverlay('tiers');
}

// --- BOOKING FLOW ---
function openBooking(storeName) {
    document.getElementById('booking-store-name').innerText = storeName;
    openOverlay('booking');
}

function confirmBooking() {
    const store = document.getElementById('booking-store-name').innerText;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;

    document.getElementById('booking-success-msg').innerText = `Lịch hẹn của bạn tại ${store} vào lúc ${time} ngày ${date} đã được ghi nhận.`;

    closeOverlay('booking');
    openOverlay('booking-success');
}

// --- ROUTING & NAVIGATION ---
function showView(viewId) {
    views.forEach(v => {
        document.getElementById(`view-${v}`).classList.add('hidden');
        document.getElementById(`nav-${v}`).classList.remove('active');
    });
    document.getElementById(`view-${viewId}`).classList.remove('hidden');
    document.getElementById(`nav-${viewId}`).classList.add('active');

    if (viewId === 'home') renderHome();
    if (viewId === 'shop') renderShop('nam');
}

function openOverlay(overlayId) {
    document.getElementById(`overlay-${overlayId}`).classList.remove('hidden');
}

function closeOverlay(overlayId) {
    document.getElementById(`overlay-${overlayId}`).classList.add('hidden');
}

function closeAllOverlays() {
    overlays.forEach(o => document.getElementById(`overlay-${o}`).classList.add('hidden'));
}

// --- RENDER FUNCTIONS ---
function renderHome() {
    const featured = [...PRODUCTS.nam.slice(0, 2), ...PRODUCTS.nu.slice(0, 2)];
    const container = document.getElementById('home-featured-products');
    container.innerHTML = featured.map(p => createProductCard(p)).join('');
}

function renderShop(tab) {
    const container = document.getElementById('shop-product-grid');
    container.innerHTML = PRODUCTS[tab].map(p => createProductCard(p)).join('');
}

function switchShopTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Clear search
    document.getElementById('shop-search-input').value = '';

    renderShop(tab);
}

function handleSearch(query) {
    const q = query.toLowerCase().trim();
    if (q === "") {
        // Re-render current active tab
        const activeTabText = document.querySelector('.tab.active').innerText.toLowerCase();
        let key = 'nam';
        if (activeTabText === 'nữ') key = 'nu';
        renderShop(key);
        return;
    }

    // Global search across all categories
    let allProducts = [];
    for (let cat in PRODUCTS) {
        allProducts = allProducts.concat(PRODUCTS[cat]);
    }

    // Remove duplicates (same product might be in multiple categories if data grows)
    const uniqueProducts = allProducts.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

    const filtered = uniqueProducts.filter(p => p.name.toLowerCase().includes(q));
    const container = document.getElementById('shop-product-grid');

    if (filtered.length === 0) {
        container.innerHTML = '<div class="p-8 text-center text-gray w-full" style="grid-column: 1 / -1;">Không tìm thấy sản phẩm nào</div>';
    } else {
        container.innerHTML = filtered.map(p => createProductCard(p)).join('');
    }
}

function createProductCard(p) {
    return `
        <div class="product-card" onclick="viewProduct('${p.id}')">
            <img src="${p.img}" class="product-image">
            <p class="product-name uppercase text-xs">${p.name}</p>
            <p class="product-price">${p.price.toLocaleString()}đ</p>
        </div>
    `;
}

// --- PRODUCT DETAIL ---
function viewProduct(id) {
    // Search in all categories
    let product = null;
    for (let cat in PRODUCTS) {
        product = PRODUCTS[cat].find(p => p.id === id);
        if (product) break;
    }

    if (!product) return;

    currentProduct = product;
    document.getElementById('pd-image').src = product.img;
    document.getElementById('pd-name').innerText = product.name;
    document.getElementById('pd-price').innerText = product.price.toLocaleString() + 'đ';

    openOverlay('product-detail');
}

function selectSize(el) {
    document.querySelectorAll('.size-box').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
}

// --- CART LOGIC ---
function addToCart() {
    if (!currentProduct) return;

    const existing = currentCart.find(item => item.id === currentProduct.id);
    if (existing) {
        existing.qty++;
    } else {
        currentCart.push({ ...currentProduct, qty: 1 });
    }

    closeOverlay('product-detail');
    renderCart();
    openOverlay('cart');
}

function renderCart() {
    const container = document.getElementById('cart-items-list');
    if (currentCart.length === 0) {
        container.innerHTML = '<p class="text-center text-gray mt-8">Giỏ hàng trống</p>';
        updateCartTotals(0);
        return;
    }

    container.innerHTML = currentCart.map((item, idx) => `
        <div class="cart-item">
            <img src="${item.img}" class="cart-item-img">
            <div class="flex-1">
                <p class="text-xs font-bold uppercase mb-1">${item.name}</p>
                <p class="text-sm mb-4">${item.price.toLocaleString()}đ</p>
                <div class="flex justify-between items-center">
                    <div class="quantity-control">
                        <div class="btn-qty" onclick="updateQty(${idx}, -1)">-</div>
                        <span class="text-sm font-bold">${item.qty}</span>
                        <div class="btn-qty" onclick="updateQty(${idx}, 1)">+</div>
                    </div>
                    <span class="material-symbols-outlined text-gray" style="font-size: 20px;" onclick="removeItem(${idx})">delete</span>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    updateCartTotals(subtotal);
}

function updateQty(idx, delta) {
    currentCart[idx].qty += delta;
    if (currentCart[idx].qty < 1) currentCart[idx].qty = 1;
    renderCart();
}

function removeItem(idx) {
    currentCart.splice(idx, 1);
    renderCart();
}

function updateCartTotals(subtotal) {
    let discount = 0;
    if (appliedVoucher) {
        if (appliedVoucher.amount < 1) { // Percentage
            discount = subtotal * appliedVoucher.amount;
        } else { // Fixed amount
            discount = appliedVoucher.amount;
        }
    }

    if (discount > subtotal) discount = subtotal;
    const total = subtotal - discount;

    document.getElementById('cart-subtotal').innerText = subtotal.toLocaleString() + 'đ';
    document.getElementById('cart-total').innerText = total.toLocaleString() + 'đ';

    document.getElementById('checkout-subtotal').innerText = subtotal.toLocaleString() + 'đ';
    document.getElementById('checkout-discount').innerText = '-' + discount.toLocaleString() + 'đ';
}

function showCheckout() {
    if (currentCart.length === 0) return alert('Giỏ hàng trống!');
    appliedVoucher = null; // Reset voucher selection on new checkout start
    document.getElementById('selected-voucher-name').innerText = 'Chọn hoặc nhập mã';
    document.getElementById('selected-voucher-name').className = 'text-sm text-gray';
    document.getElementById('checkout-discount').innerText = '-0đ';

    renderCart();
    openOverlay('checkout');
}

function placeOrder() {
    const total = parseInt(document.getElementById('cart-total').innerText.replace(/\./g, '').replace('đ', ''));

    // Add to history
    ORDERS.unshift({
        id: `ROUTINE-${Math.floor(Math.random() * 90000 + 10000)}`,
        date: new Date().toLocaleDateString('vi-VN'),
        total: total,
        status: 'Đang chuẩn bị'
    });

    closeOverlay('checkout');
    closeOverlay('cart');
    currentCart = [];
    appliedVoucher = null;
    renderCart();
    openOverlay('success');
}

// --- LOYALTY & VOUCHERS ---
function redeemVoucher(val) {
    const cost = val === 50 ? 500 : 900;
    if (userPoints < cost) return alert('Bạn không đủ điểm!');

    userPoints -= cost;
    userVouchers.push({
        name: `VOUCHER ${val}K`,
        value: `${val}.000đ`,
        amount: val * 1000,
        date: '31/12/2026'
    });

    renderVouchers();
    renderPoints();
    alert('Đổi voucher thành công! Bạn có thể sử dụng mã này khi thanh toán.');
}

function renderVouchers() {
    const container = document.getElementById('user-vouchers');
    container.innerHTML = userVouchers.map(v => `
        <div class="card" style="border: 1px dashed #ddd; background: transparent;">
            <p class="text-sm font-medium">${v.name} - ${v.value}</p>
            <p class="text-xs text-gray">Hạn sử dụng: ${v.date}</p>
        </div>
    `).join('');
}

function renderPoints() {
    // Basic point display updates
    const pointLabels = document.querySelectorAll('.text-lg.font-bold, .text-2xl.font-bold');
    pointLabels.forEach(el => {
        if (el.innerText.includes('1,250') || el.innerText.includes('1.250') || el.parentElement.innerText.includes('Số điểm hiện có')) {
            el.innerText = userPoints.toLocaleString();
        }
    });
}

// --- CHECKOUT VOUCHER SELECTION ---
function openVoucherSelect() {
    if (currentCart.length === 0) return;
    const list = document.getElementById('voucher-selection-list');
    list.innerHTML = userVouchers.map((v, idx) => `
        <div class="card mb-3" onclick="selectVoucher(${idx})">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm font-bold">${v.name}</p>
                    <p class="text-xs text-gray">Giá trị: ${v.value}</p>
                </div>
                <span class="material-symbols-outlined text-gray">chevron_right</span>
            </div>
        </div>
    `).join('');
    openOverlay('voucher-select');
}

function selectVoucher(idx) {
    appliedVoucher = userVouchers[idx];
    document.getElementById('selected-voucher-name').innerText = appliedVoucher.name;
    document.getElementById('selected-voucher-name').classList.remove('text-gray');
    document.getElementById('selected-voucher-name').classList.add('font-bold', 'text-black');

    closeOverlay('voucher-select');
    renderCart(); // Trigger totals update
}

// --- MINI GAME: LUCKY WHEEL ---
function openGameHub() {
    openOverlay('game-hub');
}

function openGame(type) {
    if (type === 'wheel') {
        closeOverlay('game-hub');
        openOverlay('wheel');
    }
}

function spinWheel() {
    const wheel = document.getElementById('wheel');
    const btn = document.getElementById('spin-btn');

    btn.disabled = true;
    btn.innerText = 'ĐANG QUAY...';

    const randomDegree = Math.floor(Math.random() * 360) + 1800; // 5 full turns
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = 'QUAY TIẾP';
        alert('Chúc mừng! Bạn nhận được Voucher 50k');

        userVouchers.push({
            name: 'WHEEL REWARD',
            value: '50.000đ',
            date: '30/06/2026'
        });
        renderVouchers();

        // Auto redirect to shop
        setTimeout(() => {
            closeOverlay('wheel');
            showView('shop');
        }, 1000);

    }, 3000);
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    validateProducts();
    showView('home');
});
