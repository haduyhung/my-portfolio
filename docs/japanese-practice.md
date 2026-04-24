# Tính năng Ôn luyện tiếng Nhật

Tính năng ẩn trên portfolio cho phép luyện tập bảng chữ cái tiếng Nhật (Hiragana & Katakana) thông qua các bài quiz tương tác.

---

## Luồng truy cập

```
Footer (click © × 5) → /secret (đăng nhập) → /japanese (hub) → /japanese/hiragana hoặc /japanese/katakana
```

### 1. Trigger ẩn

- **Vị trí**: ký tự `©` trong footer
- **Cách kích hoạt**: click nhanh **5 lần** trong vòng **2 giây**
- **Kết quả**: chuyển hướng đến trang đăng nhập `/secret`

### 2. Đăng nhập (`/secret`)

- Mật khẩu hardcode: `051020`
- Nhập sai: input rung (shake animation), hiện thông báo lỗi
- Nhập đúng: lưu `jp_auth = "1"` vào `localStorage`, chuyển sang `/japanese`
- Nếu đã đăng nhập trước đó: tự động redirect sang `/japanese`

### 3. Hub (`/japanese`)

- Hiển thị 2 card chọn bảng chữ:
  - **Hiragana** (ひらがな)
  - **Katakana** (カタカナ)
- Nút **Đăng xuất**: xóa `jp_auth` khỏi `localStorage`, về trang chủ
- Guard: nếu chưa đăng nhập → redirect về `/secret`

---

## Trang luyện tập

### Chọn chế độ

Khi vào `/japanese/hiragana` hoặc `/japanese/katakana`, người dùng chọn một trong hai chế độ trước khi bắt đầu:

| Chế độ | Hiển thị | Nhập |
|---|---|---|
| **Kana → Romaji** | Ký tự kana (あ, ア...) | Gõ romaji tự do (text input) |
| **Romaji → Kana** | Chuỗi romaji (ka, shi...) | Chọn ký tự đúng trong 4 đáp án |

---

## Cơ chế Quiz (`KanaQuiz` component)

### Dữ liệu

- **46 ký tự** mỗi bảng (nguyên âm, phụ âm cơ bản)
- Mỗi ký tự có thể có nhiều romaji hợp lệ, ví dụ:
  - `し` → `shi` hoặc `si`
  - `ち` → `chi` hoặc `ti`
  - `つ` → `tsu` hoặc `tu`
  - `ふ` → `fu` hoặc `hu`

### Luồng quiz

1. **Shuffle** toàn bộ deck ngẫu nhiên khi bắt đầu
2. Hiển thị từng câu một theo progress bar
3. Người dùng trả lời → feedback màu xanh/đỏ trong **0.8 giây** → câu tiếp theo
4. Hết 46 câu → màn kết quả

### Chế độ Kana → Romaji

- Hiển thị ký tự kana cỡ lớn
- Input text, nhấn **Enter** hoặc nút **Xác nhận**
- Nếu sai: hiện đáp án đúng ngay bên dưới trong thời gian feedback

### Chế độ Romaji → Kana

- Hiển thị chuỗi romaji
- 4 nút chọn ký tự kana (1 đúng + 3 ngẫu nhiên từ pool)
- Click để chọn, không cần xác nhận thêm
- Nếu sai: highlight ký tự đúng màu xanh, ký tự đã chọn màu đỏ

---

## Màn kết quả

Hiển thị sau khi hoàn thành 46 câu:

- **Điểm số**: `X / 46`
- **Nhận xét**:
  - `46/46` → "Hoàn hảo! Bạn nhớ hết rồi!"
  - `≥ 80%` → "Tốt lắm! Cố thêm một chút nữa nhé."
  - `< 80%` → "Luyện thêm nhé, bạn sẽ làm được!"
- **Bảng chi tiết**:
  - Panel đỏ — danh sách câu **sai**: ký tự + câu đã nhập (gạch ngang) + đáp án đúng
  - Panel xanh — danh sách câu **đúng**: ký tự + romaji
- **Nút hành động**:
  - **Làm lại**: shuffle lại deck, reset điểm
  - **Quay lại**: về `/japanese`

---

## Cấu trúc file

```
app/
├── constants/
│   └── japanese.ts              # Dữ liệu 46 Hiragana + 46 Katakana
├── components/
│   └── japanese/
│       └── kana-quiz.tsx        # Component quiz dùng chung
└── [locale]/
    ├── secret/
    │   └── page.tsx             # Trang đăng nhập
    └── japanese/
        ├── page.tsx             # Hub chọn bảng chữ
        ├── hiragana/
        │   └── page.tsx         # Trang luyện Hiragana
        └── katakana/
            └── page.tsx         # Trang luyện Katakana
```

---

## Auth & bảo mật

- Xác thực phía **client** bằng `localStorage` (key: `jp_auth`)
- Phiên đăng nhập không có thời hạn, chỉ mất khi bấm **Đăng xuất** hoặc xoá storage
- Tất cả trang `/japanese/*` đều có guard kiểm tra `jp_auth`, redirect về `/secret` nếu chưa xác thực
- Tính năng không được index bởi SEO (không có metadata, không có link public)
