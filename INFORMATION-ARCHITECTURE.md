# Stitch Routine - Loyalty Mini App
## Final Interactive Demo with Proper Information Architecture

---

## 🎯 Design Principles

✅ **ZERO UI CHANGES** - All Stitch designs preserved exactly  
✅ **Logical Navigation** - Real-world user journeys  
✅ **Mobile-First** - iOS-style responsive (480px max-width)  
✅ **Consistent Bottom Nav** - Fixed across all screens  

---

## 📱 Information Architecture

### Bottom Navigation (4 Tabs - Always Visible)

```
┌─────────────────────────────────────────┐
│  Home  │  Products  │  Activities  │  Account  │
└─────────────────────────────────────────┘
```

1. **Home** → `home-dashboard.html`
2. **Products** → `categories-selection.html`
3. **Activities** → `trung-tâm-trò-chơi.html`
4. **Account** → `user-profile.html`

---

## 🗺️ Complete User Journey Map

### 1️⃣ HOME Screen (`home-dashboard.html`)

**From Home, users can navigate to:**

```
HOME
├── Membership Status
│   └── Click "Xem đặc quyền" → hạng-thành-viên-&-đặc-quyền.html
│
├── Product Collections
│   └── Click "Xem tất cả" → bộ-sưu-tập-theo-màu.html
│
├── Loyalty Points History
│   └── Click card → loyalty-activity.html
│
└── Vouchers
    └── Click card → loyalty-activity.html
```

---

### 2️⃣ PRODUCTS Flow

**Navigation Hierarchy:**

```
Products Tab → Categories Selection
│
├── Female Category → Main Categories → Color Collections → Product Detail
│
├── Male Category → Main Categories → Color Collections → Product Detail
│
├── Tết Collection → Color Collections → Product Detail
│
└── Sustainable Items → săn-item-bền-vững.html → Product Detail
```

**Screens:**
- `categories-selection.html` - Entry point (Female/Male/Tết)
- `danh-mục-chính.html` - Main categories breakdown
- `bộ-sưu-tập-theo-màu.html` - Browse by color filter
- `săn-item-bền-vững.html` - Sustainable collection
- `chi-tiết-sản-phẩm.html` - Product detail page
- `giỏ-hàng-tối-giản.html` - Shopping cart
- `xác-nhận-thanh-toán.html` - Checkout (view only, no payment integration)

**Interactions:**
- Click any product card → Product Detail
- Click "Thêm vào giỏ" → Toast feedback + update cart count
- Click cart icon → Cart page
- Click "Thanh toán" → Checkout page
- Click favorite icon → Toggle favorite state

---

### 3️⃣ ACTIVITIES Flow

**Navigation Hierarchy:**

```
Activities Tab → Game Hub
│
├── Mini Games
│   ├── Lucky Wheel → vòng-quay-may-mắn.html
│   ├── Virtual Try-On → thử-đồ-ảo-(try-on).html
│   ├── Mix & Match → game-nối-đôi-phong-cách.html
│   ├── Wardrobe Game → game-sắp-xếp-tủ-đồ.html
│   ├── AI Challenge → thử-thách-phối-đồ-ai.html
│   └── Character Makeup → trang-điểm-nhân-vật.html
│
├── Social Activities
│   ├── Leaderboard → bảng-xếp-hạng-tuần.html
│   └── Street Style Voting → bình-chọn-street-style.html
│
└── Streaks & Rewards
    ├── Daily Streak → chuỗi-hoạt-động-daily-streak.html
    ├── TikTok Streak → chuỗi-rực-cháy-(tiktok-style).html
    └── Streak Gifts → quà-tặng-chuỗi-ngày.html
```

**Screens:**
- `trung-tâm-trò-chơi.html` - Activities hub (entry point)
- 6 mini game screens
- 2 social screens
- 3 streak/reward screens

**Interactions:**
- Click game card → Navigate to specific game
- Complete game → Toast feedback + points
- Check leaderboard → See rankings

---

### 4️⃣ LOYALTY System

**Access Points:**

```
Loyalty System (Cross-Screen Feature)
│
├── From Home
│   ├── Membership Card → hạng-thành-viên-&-đặc-quyền.html
│   ├── Points History → loyalty-activity.html
│   └── Vouchers → loyalty-activity.html
│
└── From Account
    ├── Membership → hạng-thành-viên-&-đặc-quyền.html
    ├── Benefits → đặc-quyền-thành-viên.html
    └── VIP Card → thẻ-vip-&-cá-nhân-1.html
```

**Screens:**
- `loyalty-activity.html` - Activity feed, points history, vouchers
- `hạng-thành-viên-&-đặc-quyền.html` - Membership tiers & progression
- `đặc-quyền-thành-viên.html` - Detailed benefits breakdown
- `thẻ-vip-&-cá-nhân-1.html` - Virtual VIP card

**Interactions:**
- View points balance
- See progress to next tier
- Browse available vouchers
- Check tier benefits

---

### 5️⃣ ACCOUNT Screen (`user-profile.html`)

**From Account, users can navigate to:**

```
Account Tab → User Profile
│
├── Loyalty & Membership
│   ├── Membership Tier → hạng-thành-viên-&-đặc-quyền.html
│   └── Benefits → đặc-quyền-thành-viên.html
│
├── Vouchers → loyalty-activity.html
│
├── Store Locator → tìm-kiếm-cửa-hàng-2.html
│
├── Appointments
│   ├── My Appointments → danh-sách-lịch-hẹn-của-tôi.html
│   ├── Booking Confirmed → xác-nhận-đặt-lịch-thành-công.html
│   └── Cancel Appointment → popup-xác-nhận-hủy-lịch.html
│
└── Policies (Support)
```

---

### 6️⃣ TASKS & NOTIFICATIONS

**Screens:**
- `danh-sách-nhiệm-vụ-1.html` - Daily tasks
- `danh-sách-nhiệm-vụ-2.html` - Weekly/special tasks
- `thông-báo-nhiệm-vụ.html` - Task notifications & reminders

**Access:**
- Notification icon (top right) → Task notifications
- From Activities → Tasks section

**Interactions:**
- Check task → Toast "+50 điểm" + visual feedback
- View notification → Task detail

---

### 7️⃣ ONBOARDING

**Screen:**
- `khởi-đầu-tối-giản.html` - First-time user onboarding

**Flow:**
- First launch → Onboarding → Home

---

## 🔄 Back Navigation Rules

```
Back Button Behavior:
├── Product Detail → Product List
├── Product List → Categories
├── Categories → Products Tab (Bottom Nav)
├── Game Screen → Game Hub
├── Game Hub → Activities Tab (Bottom Nav)
├── Any Detail Screen → Previous Screen
└── Any Tab Root → Stay (no back)
```

---

## 🎨 UI Preservation Checklist

✅ **No layout changes** - All spacing, padding, margins preserved  
✅ **No typography changes** - Font sizes, weights, families unchanged  
✅ **No color changes** - All brand colors exactly as Stitch designed  
✅ **No component redesign** - Cards, buttons, inputs remain identical  
✅ **No navigation redesign** - Bottom nav structure preserved  
✅ **No screen merging** - All 33+ screens kept separate  

---

## 🚦 Interactive Elements

### Automatic Event Handling:

**Products:**
- ✓ Product cards → Product detail
- ✓ "Thêm vào giỏ" → Toast + cart update
- ✓ Favorite icon → Toggle heart
- ✓ Cart icon → Cart page
- ✓ Color filters → Filter feedback
- ✓ "Thanh toán" → Checkout

**Activities:**
- ✓ Game cards → Specific game
- ✓ Leaderboard items → Leaderboard view
- ✓ Streak cards → Streak detail

**Loyalty:**
- ✓ Membership cards → Membership detail
- ✓ Voucher cards → Copy code toast
- ✓ Points history → Activity feed

**Tasks:**
- ✓ Checkboxes → Complete + points
- ✓ Notification icon → Notifications

**General:**
- ✓ Back arrows → Browser back
- ✓ Bottom nav → Tab switching
- ✓ Forms → Submit feedback
- ✓ Horizontal scroll → Drag support
- ✓ Search icon → Search toast

---

## 📏 Technical Specifications

**Mobile Viewport:**
- Max-width: 480px
- Centered on desktop
- Shadow + border-radius on desktop
- Touch-optimized interactions

**Navigation:**
- Bottom nav: Fixed position, always visible
- Back button: Browser history
- Route changes: Hard navigation (no SPA)
- Toast feedback: 2s duration, fade animation

**Cross-Browser:**
- Modern browsers (Chrome, Safari, Firefox, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎯 Entry Point for Testing

**Recommended Start:**
```
file:///c:/Users/Le%20Minh%20Anh/Downloads/stitch_routine/bo%20suu%20tap%20theo%20mau/home-dashboard.html
```

**Alternative Entry (All Screens Index):**
```
file:///c:/Users/Le%20Minh%20Anh/Downloads/stitch_routine/bo%20suu%20tap%20theo%20mau/all-screens.html
```

---

## 📊 Screen Inventory

**Total Screens: 34**

**By Category:**
- Shopping: 8 screens
- Games: 7 screens
- Loyalty: 4 screens
- Tasks: 3 screens
- Social: 2 screens
- Streaks: 3 screens
- Appointments: 3 screens
- Account: 2 screens
- Onboarding: 1 screen
- Index: 1 screen

---

## ✨ Key Features

**Realistic E-Commerce Flow:**
- Browse by category → Filter by color → View details → Add to cart → Checkout

**Gamification:**
- Daily streaks → Mini games → Leaderboards → Rewards

**Loyalty Program:**
- Points accumulation → Tier progression → Exclusive benefits → Vouchers

**Appointment System:**
- Book appointments → View schedule → Cancel if needed

**Social Engagement:**
- Street style voting → Leaderboards → Community challenges

---

## 🔐 What's NOT Implemented (By Design)

❌ Backend API calls  
❌ Real payment processing  
❌ User authentication  
❌ Database storage  
❌ Real-time updates  
❌ Push notifications  

✅ **This is a high-fidelity interactive prototype** for UX testing and stakeholder demos.

---

## 📝 Notes for Developers

**When Converting to Production:**

1. Replace `navigateTo()` with your router (React Router, Vue Router, etc.)
2. Replace `showFeedback()` with your toast library
3. Connect to backend APIs for:
   - Product data
   - User profile
   - Loyalty points
   - Order processing
4. Add state management (Redux, Vuex, Context API)
5. Implement authentication
6. Add error handling
7. Optimize images and assets
8. Add analytics tracking

**Current Architecture:**
- Vanilla JavaScript
- Hard navigation (page reloads)
- Client-side only
- No build process needed
- Static HTML/CSS/JS

---

## 🎓 Information Architecture Principles Applied

✅ **Clear Hierarchy** - 4 main sections, logical sub-navigation  
✅ **Consistent Navigation** - Bottom tabs always accessible  
✅ **Predictable Paths** - Users always know where they are  
✅ **Multiple Access Points** - Important features reachable from multiple locations  
✅ **Shallow Depth** - Max 3-4 taps to any destination  
✅ **Logical Grouping** - Related features grouped together  

---

**Last Updated:** 2026-02-04  
**Version:** 1.0 - Production-Ready IA  
**Status:** ✅ Complete & Ready for Testing
