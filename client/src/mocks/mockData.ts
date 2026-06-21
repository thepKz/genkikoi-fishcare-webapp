// Mock data cho chế độ FE-only (backend đã ngừng hoạt động).
// Chủ đề: tiệm thú y chuyên cá Koi. Ảnh dùng asset local có sẵn.

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import doctor1 from "../assets/doctor-1.jpg";
import doctor2 from "../assets/doctor-2.jpg";
import doctor3 from "../assets/doctor-3.jpg";

export const mockFeedbacks = [
  {
    rating: 5,
    comment:
      "Cá Koi nhà mình bị nấm mang, đưa tới GenKiKoi điều trị 1 tuần là khỏe lại hẳn. Bác sĩ tận tâm, theo dõi sát.",
    serviceName: "Khám & điều trị bệnh cá Koi",
    customerName: "Nguyễn Minh Quân",
    customerAvatar: avatar1,
    feedbackDate: "2026-05-12",
  },
  {
    rating: 5,
    comment:
      "Dịch vụ kiểm tra chất lượng nước rất chuyên nghiệp, có báo cáo chỉ số chi tiết và hướng dẫn cân bằng hồ.",
    serviceName: "Kiểm tra chất lượng nước hồ",
    customerName: "Trần Thị Hồng",
    customerAvatar: avatar2,
    feedbackDate: "2026-04-28",
  },
  {
    rating: 4,
    comment:
      "Tiêm vaccine phòng bệnh cho đàn Koi 12 con, quy trình nhẹ nhàng, cá không bị stress nhiều. Sẽ quay lại.",
    serviceName: "Tiêm vaccine phòng bệnh cho cá",
    customerName: "Lê Hoàng Phúc",
    customerAvatar: avatar3,
    feedbackDate: "2026-04-15",
  },
  {
    rating: 5,
    comment:
      "Koi bị ký sinh trùng, ngứa cọ mình liên tục. Sau khi xét nghiệm và điều trị thì hết hẳn. Cảm ơn đội ngũ!",
    serviceName: "Xét nghiệm nước & ký sinh trùng",
    customerName: "Phạm Anh Tú",
    customerAvatar: avatar4,
    feedbackDate: "2026-03-30",
  },
  {
    rating: 5,
    comment:
      "Được tư vấn dinh dưỡng và chế độ ăn theo mùa cho Koi, màu cá lên đẹp hơn rõ rệt sau 2 tháng.",
    serviceName: "Tư vấn dinh dưỡng cho Koi",
    customerName: "Đỗ Quang Dũng",
    customerAvatar: avatar1,
    feedbackDate: "2026-03-10",
  },
];

export const mockDoctors = [
  {
    _id: "doc1",
    fullName: "BS. Mai Tấn Thép",
    specialization: "Bệnh học cá Koi",
    yearOfExperience: 8,
    movingService: true,
    image: doctor1,
  },
  {
    _id: "doc2",
    fullName: "BS. Lê Thị Ánh Hồng",
    specialization: "Ký sinh trùng & chất lượng nước",
    yearOfExperience: 6,
    movingService: false,
    image: doctor2,
  },
  {
    _id: "doc3",
    fullName: "BS. Nguyễn Thị Hồng Hạnh",
    specialization: "Dinh dưỡng & phục hồi cá Koi",
    yearOfExperience: 5,
    movingService: true,
    image: doctor3,
  },
];

export const mockServices = [
  { _id: "sv1", serviceName: "Khám & điều trị bệnh cá Koi", price: 300000 },
  { _id: "sv2", serviceName: "Kiểm tra chất lượng nước hồ", price: 200000 },
  { _id: "sv3", serviceName: "Xét nghiệm nước & ký sinh trùng", price: 250000 },
  { _id: "sv4", serviceName: "Tiêm vaccine phòng bệnh cho cá", price: 180000 },
  { _id: "sv5", serviceName: "Tiểu phẫu & xử lý vết thương cá", price: 500000 },
  { _id: "sv6", serviceName: "Tư vấn dinh dưỡng cho Koi", price: 150000 },
];

export const mockProfile = {
  _id: "cust-demo",
  customerId: "cust-demo",
  username: "demo_user",
  fullName: "Khách Demo",
  email: "demo@genkikoi.dev",
  phoneNumber: "0888500703",
  gender: "male",
  photoUrl: avatar1,
  address: "Quận 1, TP. Hồ Chí Minh",
};
