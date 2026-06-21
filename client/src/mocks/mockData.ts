// Mock data cho chế độ FE-only (backend đã ngừng hoạt động).
// Chủ đề: tiệm thú y chuyên cá Koi.

export const KOI_IMG = {
  hero1: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80",
  hero2: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
  hero3: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  gallery1: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=600&q=80",
  gallery2: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=600&q=80",
  gallery3: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?auto=format&fit=crop&w=600&q=80",
  gallery4: "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=600&q=80",
};

const AVATAR = (seed: string) =>
  `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;

export const mockFeedbacks = [
  {
    rating: 5,
    comment:
      "Cá Koi nhà mình bị nấm mang, đưa tới GenKiKoi điều trị 1 tuần là khỏe lại hẳn. Bác sĩ tận tâm, theo dõi sát.",
    serviceName: "Khám & điều trị bệnh cá Koi",
    customerName: "Nguyễn Minh Quân",
    customerAvatar: AVATAR("quan"),
    feedbackDate: "2026-05-12",
  },
  {
    rating: 5,
    comment:
      "Dịch vụ kiểm tra chất lượng nước rất chuyên nghiệp, có báo cáo chỉ số chi tiết và hướng dẫn cân bằng hồ.",
    serviceName: "Kiểm tra chất lượng nước hồ",
    customerName: "Trần Thị Hồng",
    customerAvatar: AVATAR("hong"),
    feedbackDate: "2026-04-28",
  },
  {
    rating: 4,
    comment:
      "Tiêm vaccine phòng bệnh cho đàn Koi 12 con, quy trình nhẹ nhàng, cá không bị stress nhiều. Sẽ quay lại.",
    serviceName: "Tiêm vaccine phòng bệnh cho cá",
    customerName: "Lê Hoàng Phúc",
    customerAvatar: AVATAR("phuc"),
    feedbackDate: "2026-04-15",
  },
  {
    rating: 5,
    comment:
      "Koi bị ký sinh trùng, ngứa cọ mình liên tục. Sau khi xét nghiệm và điều trị thì hết hẳn. Cảm ơn đội ngũ!",
    serviceName: "Xét nghiệm nước & ký sinh trùng",
    customerName: "Phạm Anh Tú",
    customerAvatar: AVATAR("tu"),
    feedbackDate: "2026-03-30",
  },
  {
    rating: 5,
    comment:
      "Được tư vấn dinh dưỡng và chế độ ăn theo mùa cho Koi, màu cá lên đẹp hơn rõ rệt sau 2 tháng.",
    serviceName: "Tư vấn dinh dưỡng cho Koi",
    customerName: "Đỗ Quang Dũng",
    customerAvatar: AVATAR("dung"),
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
    image: AVATAR("doc-thep"),
  },
  {
    _id: "doc2",
    fullName: "BS. Lê Thị Ánh Hồng",
    specialization: "Ký sinh trùng & chất lượng nước",
    yearOfExperience: 6,
    movingService: false,
    image: AVATAR("doc-hong"),
  },
  {
    _id: "doc3",
    fullName: "BS. Nguyễn Thị Hồng Hạnh",
    specialization: "Dinh dưỡng & phục hồi cá Koi",
    yearOfExperience: 5,
    movingService: true,
    image: AVATAR("doc-hanh"),
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
  photoUrl: AVATAR("demo"),
  address: "Quận 1, TP. Hồ Chí Minh",
};
