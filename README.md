# Stitch Routine - Mobile App Screens

## 📱 Tổng Quan
Bộ 34 screens mobile-only với navigation events đầy đủ

## 🎯 Tính Năng Chính

### 1. Mobile-Only Responsive (480px)
- Tất cả screens chỉ hiển thị ở kích thước mobile (max-width: 480px)
- Tự động center trên màn hình desktop
- Bo góc và shadow khi xem trên desktop

### 2. Navigation Events Đầy Đủ

#### Back Navigation
- Click icon arrow_back → Quay lại trang trước

#### Bottom Navigation (4 tabs)
- Home → home-dashboard.html
- Bộ sưu tập → bộ-sưu-tập-theo-màu.html
- Hoạt động → loyalty-activity.html
- Cá nhân → user-profile.html

#### Product Interactions
- Click sản phẩm → Chi tiết sản phẩm
- Click nút "Thêm vào giỏ" → Toast notification
- Click icon favorite → Toggle yêu thích
- Click icon shopping_cart → Giỏ hàng

#### Shopping Flow
- Thêm vào giỏ → Toast "Đã thêm vào giỏ hàng"
- Đặt hàng/Thanh toán → Chuyển trang checkout
- Xác nhận thanh toán → Hoàn tất đơn

#### Games & Activities
- Click game card → Chuyển đến game tương ứng
- Sắp xếp → game-sắp-xếp-tủ-đồ.html
- Nối đôi → game-nối-đôi-phong-cách.html
- AI → thử-thách-phối-đồ-ai.html
- Vòng quay → vòng-quay-may-mắn.html

#### Tasks & Missions
- Check nhiệm vụ → Toast "+50 điểm"
- Click thông báo → Xem chi tiết

#### Other Events
- Radio/Checkbox change → Toast "Đã cập nhật lựa chọn"
- Form submit → Toast "Đã gửi thông tin"
- Swipe areas → Drag to scroll
- Voucher click → Toast "Đã sao chép mã"
- Search icon → Toast "Tìm kiếm"

## 📂 Danh Sách 34 Screens

### Shopping
1. home-dashboard.html - Trang chủ
2. bộ-sưu-tập-theo-màu.html - Lọc theo màu
3. categories-selection.html - Chọn danh mục
4. danh-mục-chính.html - Danh mục chính
5. chi-tiết-sản-phẩm.html - Chi tiết sản phẩm
6. giỏ-hàng-tối-giản.html - Giỏ hàng
7. xác-nhận-thanh-toán.html - Checkout
8. săn-item-bền-vững.html - Sustainable items

### Games
9. trung-tâm-trò-chơi.html - Game hub
10. game-sắp-xếp-tủ-đồ.html - Wardrobe organizer
11. game-nối-đôi-phong-cách.html - Style matching
12. thử-thách-phối-đồ-ai.html - AI styling
13. vòng-quay-may-mắn.html - Lucky wheel
14. thử-đồ-ảo-(try-on).html - Virtual try-on
15. trang-điểm-nhân-vật.html - Character makeup

### Social & Community
16. bảng-xếp-hạng-tuần.html - Weekly leaderboard
17. bình-chọn-street-style.html - Street style voting

### Loyalty & Membership
18. loyalty-activity.html - Loyalty activity
19. hạng-thành-viên-&-đặc-quyền.html - Membership tiers
20. đặc-quyền-thành-viên.html - Member benefits
21. thẻ-vip-&-cá-nhân-1.html - VIP card

### Tasks & Streaks
22. danh-sách-nhiệm-vụ-1.html - Task list 1
23. danh-sách-nhiệm-vụ-2.html - Task list 2
24. thông-báo-nhiệm-vụ.html - Task notifications
25. chuỗi-hoạt-động-daily-streak.html - Daily streak
26. chuỗi-rực-cháy-(tiktok-style).html - TikTok streak
27. quà-tặng-chuỗi-ngày.html - Streak rewards

### Appointments
28. danh-sách-lịch-hẹn-của-tôi.html - My appointments
29. xác-nhận-đặt-lịch-thành-công.html - Booking confirmed
30. popup-xác-nhận-hủy-lịch.html - Cancel popup

### Other
31. user-profile.html - User profile
32. tìm-kiếm-cửa-hàng-2.html - Store finder
33. khởi-đầu-tối-giản.html - Onboarding
34. index.html - Bộ sưu tập theo màu (original)

## 🚀 Cách Sử Dụng

### Xem Tất Cả Screens
Mở file: `all-screens.html`

### Bắt Đầu Từ Home
Mở file: `home-dashboard.html`

### Test Navigation
1. Click vào bất kỳ sản phẩm nào
2. Click nút back để quay lại
3. Click bottom nav để chuyển tabs
4. Thử các buttons để xem toast notifications

## 📁 File Structure

```
bo suu tap theo mau/
├── mobile.css              # Mobile-only responsive CSS
├── navigation.js           # Tất cả navigation events
├── all-screens.html        # Index xem tất cả screens
├── inject-navigation.ps1   # Script inject navigation
├── inject-mobile-css.ps1   # Script inject mobile CSS
└── [34 HTML screens]       # Tất cả screens
```

## 🔧 Technical Details

### mobile.css
- Force max-width: 480px
- Center trên desktop
- Shadow effect
- Bo góc 16px trên desktop

### navigation.js
- 25 routes được map
- Auto-detect back buttons
- Smart event delegation
- Toast notification system
- Swipe/drag support
- Form handling

## 💡 Lưu Ý
- Tất cả screens responsive MOBILE ONLY
- Tất cả events đã được cấu hình tự động
- Toast notifications hiển thị 2 giây
- Navigation dùng window.location.href (hard navigation)
- Tất cả files đã được inject mobile.css và navigation.js
