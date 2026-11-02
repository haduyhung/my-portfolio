# Flashcard tiếng Nhật và cột Romaji

Minna, Numbers và Ôn tập theo khoảng bài dùng chung hai chế độ:

- `flashcard`: Kanji/Kana ở mặt trước; nghĩa theo locale và Romaji ở mặt sau.
- `reverse-flashcard`: nghĩa tiếng Việt ở mặt trước; Kanji/Kana và Romaji ở mặt sau. Chỉ dùng nghĩa tiếng Anh nếu thiếu tiếng Việt, không phụ thuộc locale giao diện.

## Thao tác

- Bấm thẻ hoặc nhấn `Space` / `Enter` để lật qua lại. `Tab` chuyển giữa các nút; `Space` / `Enter` kích hoạt nút đang focus.
- Sau khi lật, chọn **Chưa biết** bằng `←` hoặc vuốt/kéo sang trái; chọn **Biết rồi** bằng `→` hoặc vuốt/kéo sang phải.
- Vuốt ngắn, cuộn dọc hoặc hủy thao tác không đánh giá và không tự lật thẻ. Giữ phím hoặc thao tác trong lúc chuyển thẻ không ghi nhận thêm câu trả lời.
- Mặt trước có nút **Lật thẻ**; mặt sau có hai nút đánh giá. Không có nút **Lật lại** hoặc hướng dẫn bàn phím hiển thị.
- Dưới 768px, nhóm nút nổi gần đáy màn hình và chừa vùng an toàn của thiết bị. Trên desktop, nhóm nút nằm dưới thẻ.
- Thẻ giữ chiều cao khi lật: 288px trên mobile, 320px trên desktop. Nội dung dài có thể cuộn trong thẻ.

Hết lượt sẽ hiển thị số từ đã biết/chưa biết. **Ôn lại** chỉ lấy nhóm chưa biết của lượt vừa làm; **Làm lại từ đầu** khôi phục toàn bộ bộ từ và giữ chế độ. Quay về cài đặt ôn tập giữ khoảng bài và loại bài; reload bắt đầu lượt mới.

## Ẩn/hiện Romaji

Trang bài học Minna và Numbers có switch **Hiện Romaji**, mặc định bật. Tắt sẽ bỏ cả tiêu đề và ô dữ liệu Romaji, thu bảng từ năm xuống bốn cột. Lựa chọn chỉ nằm trong state của trang, không lưu vào storage và không thay đổi dữ liệu bài tập.

## Kiểm tra

Chạy từ thư mục frontend:

```powershell
node --test app/constants/japanese-review.test.cjs app/components/japanese/exercises/exercise-data.test.cjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
npm run build
```

Script `scripts/flashcard-smoke.cjs` dùng Playwright và Chrome để kiểm tra 11 nhóm tương tác, gồm bàn phím, hoàn thành/ôn lại/reset, điều hướng, mobile, kéo chuột, cảm ứng mô phỏng và switch Romaji. Khởi động server frontend trước khi chạy. Playwright có thể cài riêng ngoài dự án:

```powershell
$env:PLAYWRIGHT_MODULE_PATH = 'C:/path/to/node_modules/playwright'
$env:FLASHCARD_BASE_URL = 'http://localhost:3000'
node scripts/flashcard-smoke.cjs
```

Bỏ `PLAYWRIGHT_MODULE_PATH` nếu Node đã tìm được module `playwright`. Các tùy chọn khác:

- `PLAYWRIGHT_CHANNEL=msedge`: dùng Edge thay Chrome.
- `FLASHCARD_SCENARIO`: chỉ chạy nhóm có tên chứa chuỗi đã chọn.
- `FLASHCARD_SCREENSHOT_PATH`: lưu ảnh mobile; ảnh mặt sau có hậu tố `-back`.

Kiểm tra khi triển khai: 13 test helper và 11 nhóm trình duyệt đạt; không ghi nhận lỗi console. TypeScript, ESLint các file liên quan và build production đều đạt.
