# Brainstorm: GenKiKoi → FE-only + Redesign Trang chủ

**Date:** 2026-06-21
**Status:** agreed

## Problem statement
- Backend đã die. 41 lời gọi `handleAPI` ở 22 file đều fail → toast đỏ "Có lỗi xảy ra khi tải phản hồi" (Home.tsx:52, Booking.tsx:119, ...).
- Trang chủ dùng template **phòng khám thú cưng** (siêu âm thai, phẫu thuật, pet shop chó mèo) — SAI chủ đề. Đây là **tiệm thú y chuyên cá Koi**.
- Firebase crash trang trắng khi `.env` trống → đã fix turn trước (guard null trong `firebaseConfig.ts`).

## Requirements (đã chốt với user)
- FE-only: tắt hẳn backend, mock **tất cả** route (GET hiển thị + POST login/booking/profile giả) để bấm xuyên suốt như app thật, hết toast đỏ.
- Home: **refine** theme xanh nước hiện tại (#0C3C54 / #2A7F9E) theo taste-skill-pack — KHÔNG đổi layout lớn.
- Sửa icon + nội dung dịch vụ đúng chủ đề cá Koi.
- Ảnh: Unsplash URL cố định chủ đề koi/hồ.

## Kiến trúc — điểm mấu chốt
Mọi API qua 1 cửa: `handleAPI` → `axiosInstance`. → chặn/định tuyến tại 1 chỗ, KHÔNG sửa 22 file.

## Approaches
### A. Mock layer trong `handleAPI` (CHỌN)
- `client/src/mocks/` chứa data giả + bảng route→handler.
- Cờ `VITE_FE_ONLY=true` → match url → trả mock, không gọi mạng.
- Route chưa match → trả `{ data: [] }` an toàn (không throw → hết toast đỏ).
- Ưu: sửa 1 file lõi; bật/tắt bằng env; dễ gỡ khi backend sống lại.
- Nhược: phải viết mock cho route chính.

### B. Chỉ nuốt lỗi ở axiosInstance (loại)
- Nhanh nhưng trang trống trơn → ngược yêu cầu "mock đầy đủ". Dùng làm fallback phụ.

## Sửa nội dung Home (sai → đúng koi)
| Hiện tại (sai) | Sửa thành |
|---|---|
| 🏥 Tư vấn & Điều trị | Khám & điều trị bệnh cá Koi |
| 🔬 Xét nghiệm máu/ký sinh trùng máu | Xét nghiệm nước & ký sinh trùng |
| 📱 Siêu âm thai/mô mềm | Kiểm tra chất lượng nước hồ |
| ⚕️ Phẫu thuật | Tiểu phẫu & xử lý vết thương cá |
| 💉 Tiêm ngừa | Tiêm vaccine phòng bệnh cho cá |
| 🏪 Pet Shop | Tư vấn dinh dưỡng & sản phẩm cho Koi |
- "thú cưng" → "cá Koi của bạn". Emoji → iconsax đồng bộ.

## Risks
- `source.unsplash.com` random đã chết → dùng URL Unsplash cố định (photo id).
- Ảnh ngoài cần mạng; giữ ảnh local làm fallback nếu cần offline.
- POST routes (login/booking): trả success giả + cờ demo, tránh tạo cảm giác lỗi.

## Success criteria
- Mở Home: không toast đỏ, ảnh + feedback hiển thị, nội dung đúng chủ đề koi.
- Điều hướng các trang chính không văng lỗi đỏ.
- `tsc -b --noEmit` exit 0; dev server không lỗi transform.

## Next steps
- Lập plan chi tiết: (1) mock layer + env flag, (2) data mock cho route chính, (3) refine Home + sửa icon/nội dung, (4) thay ảnh Unsplash, (5) verify.
