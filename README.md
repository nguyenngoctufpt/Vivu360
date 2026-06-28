# Vivu360 - Ứng dụng du lịch ảo 3D tương tác

Vivu360 là một ứng dụng di động React Native (sử dụng Expo) cho phép người dùng trải nghiệm tham quan ảo các địa danh du lịch nổi tiếng dưới dạng hình ảnh/video 360 độ và công nghệ AR Spatial Reconstruction, kết hợp hệ thống mạng xã hội bảng tin, đặt vé điện tử và chat cộng đồng.

---

## Yêu cầu hệ thống
Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- **Node.js** (Phiên bản khuyến nghị: LTS 18.x hoặc 20.x)
- Điện thoại di động đã cài sẵn ứng dụng **Expo Go** (tải miễn phí trên CH Play hoặc App Store) để chạy thử.

---

## Hướng dẫn cài đặt và chạy ứng dụng

### Bước 1: Clone dự án và cài đặt dependencies
Mở Terminal (hoặc Command Prompt/PowerShell) tại thư mục dự án và chạy lệnh sau để tải tất cả các thư viện cần thiết:
```bash
npm install
```

### Bước 2: Cấu hình thông số kết nối Firebase
Mở file `src/auth/firebaseConfig.js` trong thư mục code của bạn và cập nhật các thông số cấu hình chính xác từ dự án Firebase Web App của bạn:
```javascript
const firebaseConfig = {
  apiKey: "MÃ_API_KEY_CỦA_BẠN",
  authDomain: "dự-án.firebaseapp.com",
  projectId: "dự-án",
  storageBucket: "dự-án.appspot.com",
  messagingSenderId: "mã-số",
  appId: "mã-ứng-dụng",
  measurementId: "mã-đo-lường"
};
```
*(Hãy nhớ kích hoạt phương thức đăng nhập bằng **Email/Password** trong tab **Authentication -> Sign-in method** trên Firebase Console để tính năng đăng nhập/đăng ký hoạt động).*

### Bước 3: Khởi động máy chủ phát triển (Metro Bundler)
Chạy lệnh sau để khởi động Expo:
```bash
npm start
```
Hoặc:
```bash
npx expo start
```

### Bước 4: Chạy ứng dụng trên thiết bị

#### Cách 1: Chạy trên điện thoại thật (Khuyên dùng)
1. Kết nối điện thoại và máy tính của bạn vào **cùng một mạng Wi-Fi**.
2. **Android:** Mở ứng dụng **Expo Go**, chọn tính năng quét mã QR và quét mã QR hiển thị trên màn hình Terminal máy tính.
3. **iOS:** Mở ứng dụng **Camera** mặc định quét mã QR, nhấp vào liên kết mở trong ứng dụng **Expo Go**.

#### Cách 2: Chạy trên máy ảo (Emulator / Simulator)
- Nhấn phím **`a`** trên bàn phím Terminal để mở ứng dụng trên máy ảo Android (yêu cầu đã mở sẵn Android Studio Emulator).
- Nhấn phím **`i`** trên bàn phím Terminal để mở ứng dụng trên máy ảo iOS (yêu cầu máy Mac đã cài sẵn Xcode Simulator).

---

## Cấu trúc thư mục chính của dự án
```text
DATN_VIVU360/
├── src/
│   ├── auth/            # Quản lý Đăng nhập, Đăng ký, Cấu hình Firebase & Thông báo đẩy
│   ├── chat/            # Giao diện nhóm chat cộng đồng du khách
│   ├── map/             # Bản đồ tương tác, Virtual Tour 360°, chi tiết vé
│   ├── screens/         # Các màn hình chính (Trang chủ, Khám phá, Camera AR, Cá nhân)
│   ├── settings/        # Cài đặt cá nhân, cấp bậc hội viên, thử thách hành trình
│   ├── social/          # Bảng tin mạng xã hội chia sẻ ảnh du lịch
│   ├── App.js           # Điểm đầu vào chính và xử lý điều hướng tab của ứng dụng
│   └── data.js          # Dữ liệu mô phỏng (mock data) của ứng dụng
├── package.json         # Cấu hình dự án và danh sách thư viện phụ thuộc
└── app.json             # Cấu hình hiển thị của ứng dụng Expo (được khuyên khích tạo thêm)
```
