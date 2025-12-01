<div align="center">

  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="logo" width="100" height="auto" />
  <h1>SCORE MASTER PRO 5.0</h1>
  
  <p>
    <b>Hệ thống Quản lý & Tính điểm GPA Sinh viên Toàn diện</b>
  </p>

  <p>
    <a href="https://github.com/your-username/your-repo/issues">
      <img src="https://img.shields.io/github/issues/your-username/your-repo?style=flat-square&color=red" alt="issues"/>
    </a>
    <a href="https://github.com/your-username/your-repo/network/members">
      <img src="https://img.shields.io/github/forks/your-username/your-repo?style=flat-square&color=orange" alt="forks"/>
    </a>
    <a href="https://github.com/your-username/your-repo/stargazers">
      <img src="https://img.shields.io/github/stars/your-username/your-repo?style=flat-square&color=yellow" alt="stars"/>
    </a>
    <a href="https://github.com/your-username/your-repo/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/your-username/your-repo?style=flat-square&color=blue" alt="license"/>
    </a>
  </p>

  <h4>
    <a href="#tính-năng">Tính năng</a> •
    <a href="#cài-đặt">Cài đặt</a> •
    <a href="#cấu-trúc">Cấu trúc</a> •
    <a href="#database">Database</a>
  </h4>
</div>

---

## 📖 Giới thiệu (Introduction)

**ScoreMaster Pro** (Score Data) không chỉ là một công cụ tính điểm đơn thuần. Đây là giải pháp **Cloud-based** giúp sinh viên các trường Đại học (hỗ trợ sẵn HUFLIT, HUIT) theo dõi lộ trình học tập, quản lý tín chỉ, và dự phóng GPA tích lũy một cách trực quan nhất.

Dự án được xây dựng với tư duy **Mobile-First**, giao diện **Glassmorphism** hiện đại và tích hợp Back-end mạnh mẽ từ **Supabase**.

## 🚀 Tính năng nổi bật (Key Features)

### 🌟 Core Features
* **Smart GPA Calculator:** Tính điểm môn học theo trọng số linh hoạt (50:50, 30:70, 20:30:50, Đồ án 100%).
* **Dynamic Dashboard:** Tự động tính GPA hệ 4 và hệ 10, xếp loại học lực, thống kê số môn Đậu/Rớt và tổng tín chỉ.
* **Visual Charts:** Biểu đồ phân bố điểm số (A, B, C, D, F) trực quan sử dụng Chart.js.
* **History & Folder System:** Lưu lịch sử điểm, gom nhóm môn học theo Folder (Học kỳ/Năm học) và ghim thư mục ra Dashboard.

### 🛡️ System & Security
* **Supabase Cloud Sync:** Đồng bộ dữ liệu đa thiết bị theo thời gian thực.
* **Authentication:** Đăng ký, Đăng nhập, Quên mật khẩu.
* **Guest Mode:** Chế độ khách sử dụng LocalStorage (không cần tài khoản).
* **Admin Panel:** Hệ thống quản trị viên chuyên nghiệp (Xem danh sách user, Ban/Unban user, Xóa tài khoản).

### 🎨 UI/UX & Utilities
* **Glassmorphism Design:** Giao diện kính mờ sang trọng, hiệu ứng Blob Animation.
* **Dark/Light Mode:** Chuyển đổi giao diện Sáng/Tối bảo vệ mắt.
* **Multi-language:** Hỗ trợ song ngữ Tiếng Việt 🇻🇳 / Tiếng Anh 🇺🇸.
* **Avatar Cropper:** Tích hợp công cụ cắt ảnh đại diện chuyên nghiệp.
* **Export/Import Data:** Sao lưu dữ liệu ra file JSON và khôi phục dễ dàng.

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Lĩnh vực | Công nghệ |
| :--- | :--- |
| **Front-end** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Back-end** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) |
| **Libraries** | `Chart.js` (Biểu đồ), `Cropper.js` (Xử lý ảnh), `Canvas Confetti` (Hiệu ứng) |
| **Tools** | `FontAwesome 6` (Icons), `Google Fonts` (Typography) |

## 📐 Kiến trúc hệ thống (Architecture)

```mermaid
graph TD
    A[User Client] -->|Auth & Sync| B(Supabase Auth & DB);
    A -->|Guest Mode| C(Local Storage);
    B -->|Return User Data| A;
    A -->|Render UI| D{Features};
    D -->|Visualize| E[Dashboard & Charts];
    D -->|Logic| F[GPA Calculator];
    D -->|Manage| G[Admin Panel];
    G -.->|Control| B;

ScoreMaster-Pro/
├── index.html          # Giao diện chính (SPA Structure)
├── style.css           # Styling (Variables, Animations, Responsive)
├── script.js           # Core Logic, API Calls, UI Handling
├── images/             # Assets (Logos, Defaults)
│   ├── DefaultProfilePic.jpg
│   ├── agribank_qr.png
│   └── ...
└── README.md           # Tài liệu dự án
