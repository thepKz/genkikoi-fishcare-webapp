import { Avatar, Button, message, Rate, Spin } from "antd";
import {
  Activity,
  ArrowLeft2,
  ArrowRight2,
  Award,
  Calendar,
  Call,
  Drop,
  EmojiHappy,
  Heart,
  HeartTick,
  Hospital,
  Microscope,
  Moneys,
  Profile2User,
  ShieldTick,
  Star,
  User,
} from "iconsax-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";
import { KOI_IMG } from "../mocks/mockData";
import { AnimatedSection, DividerComponent } from "../share";

// Ảnh chủ đề cá Koi / hồ nước (Unsplash, cố định theo photo id).
const Background = KOI_IMG.hero3;
const Image1 = KOI_IMG.hero1;
const Image2 = KOI_IMG.hero2;
const Image3 = KOI_IMG.hero3;
const Fish1 = KOI_IMG.gallery1;
const Fish2 = KOI_IMG.gallery2;
const Fish3 = KOI_IMG.gallery3;
const Fish4 = KOI_IMG.gallery4;
const FishBanner = KOI_IMG.hero1;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        setIsLoadingFeedbacks(true);
        const api = `/api/feedbacks/public`;
        const res = await handleAPI(api, undefined, "GET");
        setFeedbacks(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Có lỗi xảy ra khi tải phản hồi");
      } finally {
        setIsLoadingFeedbacks(false); 
      }
    };
    getFeedbacks();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src={Background}
          alt=""
        />
        {/* Overlay layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C3C54]/95 via-[#0C3C54]/85 to-[#175670]/80"></div>
      </div>

      {/* Banner Container */}
      <div className="h-[100 vh] relative">
        {/* Banner Content */}
        <div className="relative z-0 flex min-h-screen items-center justify-between px-40 text-white">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
            }}
            className="w-3/6 rounded-lg bg-opacity-50 p-6"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Drop size={16} variant="Bold" color="#f7776d" />
              Phòng khám thú y chuyên cá Koi
            </div>
            <h1 className="heading-1 mb-4 text-5xl font-bold leading-tight">
              Hơn cả <span className="text-[#f7776d]">sự hài lòng</span>.
            </h1>
            <p className="max-w-[60ch] py-4 text-justify text-base text-gray-100">
              GenKiKoi là tập thể những người trẻ, đầy nhiệt huyết và giàu kinh nghiệm trong lĩnh
              vực điều trị và chăm sóc cho cá Koi. <br />
              Tôn chỉ của chúng tôi là Uy tín – Chất lượng – Tận tâm.
            </p>
            <div className="flex gap-4">
              <Button
                ghost
                size="large"
                type="primary"
                onClick={() => window.open('https://zalo.me/0888500703', '_blank')}
                className="z-20 mt-4 border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700 flex items-center"
              >
                Gọi tổng đài
                <Call size={18} className="ml-2" />
              </Button>

              <Button
                ghost
                size="large"
                type="primary"
                onClick={() => navigate('/booking')}
                className="z-20 mt-4 border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700 flex items-center"
              >
                Đặt lịch hẹn
                <Calendar size={18} className="ml-2" />
              </Button>

              <Button
                ghost
                size="large"
                type="primary" 
                onClick={() => navigate('/doctors')}
                className="z-20 mt-4 border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700 flex items-center"
              >
                Tìm bác sĩ
                <Profile2User size={18} className="ml-2" />
              </Button>
            </div>
          </AnimatedSection>
          <div className="ml-8 flex w-1/2 items-center justify-center gap-4">
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="h-80 w-1/3 transform overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105"
            >
              <img
                src={Image1}
                alt=""
                className="h-full w-full object-cover filter transition-all duration-500 hover:brightness-110"
              />
            </AnimatedSection>
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="h-96 w-1/3 transform overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105"
            >
              <img
                src={Image2}
                alt=""
                className="h-full w-full object-cover filter transition-all duration-500 hover:saturate-150"
              />
            </AnimatedSection>
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="h-80 w-1/3 transform overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105"
            >
              <img
                src={Image3}
                alt=""
                className="h-full w-full object-cover filter transition-all duration-500 hover:contrast-125"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
      {/* Why? Section */}
      <div className="section relative min-h-screen bg-gradient-to-t from-[#2A7F9E] to-[#175670] text-center text-white">
        <div className="container mx-auto py-20 lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: -100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
          >
            <h1 className="heading-1 mb-5">Tại sao chọn GenKiKoi?</h1>
            <p className="text-lg">
              Rất cảm ơn bạn đã sử dụng dịch vụ tại GenKiKoi. Nếu chưa, chúng tôi có những lý do sau
              để hy vọng một lúc nào đó sẽ được phục vụ bạn.
            </p>
          </AnimatedSection>

          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: 100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
            className="my-10 grid grid-cols-2 gap-10"
          >
            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#f7776d] p-4 shadow-lg">
                  <EmojiHappy
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Cam kết sự hài lòng
                  </h2>
                  <p className="text-gray-200">300+ người dùng tin tưởng</p>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#406ff4] p-4 shadow-lg">
                  <Moneys
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Thanh toán tiện lợi
                  </h2>
                  <p className="text-gray-200">
                    Có nhiều hình thức thanh toán cho bạn tại GenKiKoi
                  </p>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#2ed67b] p-4 shadow-lg">
                  <HeartTick
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Sạch sẽ & thân thiện
                  </h2>
                  <p className="text-gray-200">
                    Trang thiết bị hiện đại, không gian sạch sẽ và an toàn
                  </p>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#5756d6] p-4 shadow-lg">
                  <Star
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Khuyến mãi
                  </h2>
                  <p className="text-gray-200">Nhiều chế độ khuyến mãi cho khách hàng</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.5 },
              },
            }}
          >
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="link"
              onClick={() => navigate("/about-us")}
              className="mt-8 text-white transition-all duration-300 hover:scale-110 hover:text-blue-300"
            >
              Và thêm nhiều lý do để chọn GenKiKoi
              <ArrowRight2
                size={18}
                className="ml-2"
              />
            </Button>
          </AnimatedSection>
        </div>
      </div>

      {/* Services */}
      <div className="relative min-h-screen bg-[#2A7F9E] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-40">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <div className="mb-16 text-center">
              <h1 className="mb-6 text-4xl font-bold">Đầy đủ dịch vụ cho cá Koi của bạn</h1>
              <div className="mx-auto h-1 w-24 rounded-full bg-[#f7776d]"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  Icon: Hospital,
                  accent: "#f7776d",
                  title: "Khám & điều trị bệnh cá Koi",
                  description:
                    "Đội ngũ bác sĩ thú y chuyên về cá Koi, nhiều năm kinh nghiệm chẩn đoán và điều trị các bệnh thường gặp trên Koi.",
                },
                {
                  Icon: Drop,
                  accent: "#406ff4",
                  title: "Kiểm tra chất lượng nước hồ",
                  description:
                    "Đo và phân tích các chỉ số nước (pH, NH3, NO2, O2...), tư vấn cân bằng môi trường hồ nuôi Koi.",
                },
                {
                  Icon: Microscope,
                  accent: "#2ed67b",
                  title: "Xét nghiệm nước & ký sinh trùng",
                  description:
                    "Soi mẫu da, mang và nước hồ để phát hiện ký sinh trùng, vi khuẩn và nấm gây bệnh cho cá Koi.",
                },
                {
                  Icon: ShieldTick,
                  accent: "#5756d6",
                  title: "Tiêm vaccine phòng bệnh cho cá",
                  description:
                    "Tiêm phòng và xử lý dự phòng giúp đàn Koi tăng đề kháng, giảm rủi ro dịch bệnh theo mùa.",
                },
                {
                  Icon: Activity,
                  accent: "#f7776d",
                  title: "Tiểu phẫu & xử lý vết thương cá",
                  description:
                    "Xử lý vết loét, vết thương ngoài da và các tiểu phẫu an toàn, hồi phục nhanh cho cá Koi.",
                },
                {
                  Icon: Award,
                  accent: "#406ff4",
                  title: "Tư vấn dinh dưỡng cho Koi",
                  description:
                    "Tư vấn chế độ ăn theo mùa và theo độ tuổi giúp Koi lên màu đẹp, khỏe mạnh và phát triển tốt.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: service.accent }}
                    >
                      <service.Icon size={28} variant="Bold" color="#fff" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-xl font-bold">{service.title}</h2>
                      <p className="leading-relaxed text-gray-200">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Images */}
      <div className="section bg-[#0C3C54] pb-0 text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: -100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
          >
            <h1 className="heading-1 mb-5">Hình ảnh hoạt động tại GenKiKoi</h1>
          </AnimatedSection>
          {/* Images list */}
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: 100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
          >
            <div className="my-20 grid grid-cols-4 gap-5">
              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish1}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish2}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish3}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish4}
                  alt=""
                />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.5 },
              },
            }}
          >
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="link"
              onClick={() => navigate("/images")}
            >
              Thêm hình ảnh
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
        <div className="bg-[#0C3C54]">
          <svg
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          ></svg>
        </div>
      </div>

      {/* Feedbacks */}
      <div className="section relative min-h-screen bg-[#2A7F9E] text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                y: 150,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <h1 className="mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
              Được khách hàng ghi nhận
            </h1>
            <div className="flex justify-center gap-2">
              <p className="text-xl">Sự hài lòng của khách hàng là thứ chúng tôi luôn mong muốn</p>
              <div className="relative">
                <Heart
                  variant="Bold"
                  color="#FF6B6B"
                  className="absolute"
                />
                <Heart
                  variant="Bold"
                  color="#FF6B6B"
                  className="absolute animate-ping"
                />
              </div>
            </div>
            <div className="my-10 cursor-grabbing">
              <Carousel
                infinite={true}
                autoPlay
                autoPlaySpeed={3000}
                customRightArrow={
                  <button className="absolute right-0 p-2 text-white duration-200 ease-in hover:text-blue-300">
                    <ArrowRight2 />
                  </button>
                }
                customLeftArrow={
                  <button className="absolute left-2 p-2 text-white duration-200 ease-in hover:text-blue-300">
                    <ArrowLeft2 />
                  </button>
                }
                className="p-1"
                responsive={responsive}
              >
                {isLoadingFeedbacks ? (
                  <div className="flex justify-center">
                    <Spin size="large" />
                  </div>
                ) : feedbacks.length > 0 ? (
                  feedbacks.map((feedback, index) => (
                    <div key={index} className="mx-2 flex h-full flex-col justify-between rounded-xl bg-white/10 p-5 py-10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                      <div>
                        <div className="mb-3">
                          <Rate disabled defaultValue={feedback.rating} />
                        </div>
                        <p className="mb-3 text-lg">{feedback.comment}</p>
                        <p className="text-sm text-gray-300">Dịch vụ: {feedback.serviceName}</p>
                      </div>
                      <div className="text-center mt-4">
                        <Avatar
                          size="large"
                          className="mb-2 border-2 border-blue-300"
                          src={feedback.customerAvatar}
                          icon={<User />}
                        />
                        <h3 className="font-bold text-blue-100">{feedback.customerName}</h3>
                        <p className="text-sm text-gray-300">
                          {new Date(feedback.feedbackDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p>Chưa có đánh giá nào</p>
                  </div>
                )}
              </Carousel>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <DividerComponent />

      {/* Expected */}
      <div className="section relative -mt-1 min-h-screen bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <h1 className="mb-6 text-4xl font-bold text-transparent text-white lg:text-5xl">
              Kỳ vọng gì từ GenKiKoi
            </h1>
            <div className="flex justify-center gap-2">
              <p className="text-xl">
                Hãy để chúng tôi thay mặt bạn mang đến cho đàn cá Koi những điều tốt đẹp nhất.
              </p>
            </div>
          </AnimatedSection>
          <div className="my-10 flex">
            <div className="w-1/2">
              <AnimatedSection
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -50,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-3xl font-bold shadow-lg">
                    1
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      Uy tín
                    </h3>
                    <p className="leading-relaxed text-gray-100">
                      Đội ngũ bác sĩ rất uy tín, có nhiều năm kinh nghiệm làm việc tại các bệnh viện
                      thú y lớn tại Sài Gòn. Được rất nhiều khách hàng tin tưởng và đánh giá cao.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-3xl font-bold shadow-lg">
                    2
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      Chất lượng
                    </h3>
                    <p className="leading-relaxed text-gray-100">
                      GenKiKoi là phòng khám thú y chuyên về chăm sóc và điều trị cá Koi. Ở đây
                      chúng tôi luôn đặt chất lượng điều trị lên hàng đầu.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-400 text-3xl font-bold shadow-lg">
                    3
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      Tận tâm
                    </h3>
                    <p className="leading-relaxed text-gray-100">
                      Chúng tôi hiểu rằng bên cạnh chất lượng điều trị thì chính sự nỗ lực từ trong
                      tâm sẽ là liều thuốc tinh thần mạnh mẽ nhất dành cho những chú cá Koi khi đến
                      với GenKiKoi.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="w-1/2">
              <AnimatedSection
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 50,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
                className="flex h-full items-center justify-center"
              >
                <img
                  className="ml-auto w-4/5 transition-all duration-300 hover:scale-105"
                  src={FishBanner}
                  alt=""
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
      <DividerComponent />
    </div>
  );
};

export default Home;
