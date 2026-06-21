import { Button } from "antd";
import {
  Activity,
  ArrowRight2,
  Award,
  Calendar,
  Drop,
  Hospital,
  Microscope,
  ShieldTick,
} from "iconsax-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ServiceBanner from "../../assets/serviceBanner.png";
import Fish1 from "../../assets/fish-care-1.jpg";
import Fish2 from "../../assets/fish-care-2.webp";
import Fish3 from "../../assets/fish-care-3.jpg";
import Fish4 from "../../assets/fish-care-4.jpg";
import WQ1 from "../../assets/water-quality-1.jpg";
import WQ3 from "../../assets/water-quality-3.jpg";
import Vaccine1 from "../../assets/vaccine-1.jpg";
import SpecialCare1 from "../../assets/special-care-1.jpg";
import Consulting from "../../assets/consulting.webp";

// ─── Palette ──────────────────────────────────────────────────────────────────
const T = {
  bg0:  "#081820",
  bg1:  "#0D2430",
  bg2:  "#122B38",
  bg3:  "#1A3848",
  gold: "#F3D7A6",
  goldD:"#D99A3D",
  teal: "#1D8A76",
  coral:"#E8725A",
  mid:  "#3A6B7E",
} as const;

// ─── Motion primitives ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const vFadeUp   = { hidden:{opacity:0,y:36},  show:{opacity:1,y:0,  transition:{duration:0.72,ease}} };
const vFadeLeft = { hidden:{opacity:0,x:-32}, show:{opacity:1,x:0,  transition:{duration:0.65,ease}} };
const vScale    = { hidden:{opacity:0,scale:0.86}, show:{opacity:1,scale:1,transition:{duration:0.65,ease}} };
const vStagger  = (s=0.09,d=0)=>({ hidden:{}, show:{transition:{staggerChildren:s,delayChildren:d}} });
const SP = { type:"spring", stiffness:260, damping:22 } as const;

// ─── Reveal — stagger container, fires via whileInView ───────────────────────
function Reveal({children,className="",stag=0.1,delay=0}:{
  children:React.ReactNode;className?:string;stag?:number;delay?:number;
}) {
  return (
    <motion.div
      variants={vStagger(stag,delay)}
      initial="hidden"
      whileInView="show"
      viewport={{once:true,margin:"-15% 0px -15% 0px"}}
      className={className}
    >{children}</motion.div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const services = [
  { Icon: Hospital,   accent: T.coral,  title: "Khám & điều trị bệnh cá Koi", desc: "Chẩn đoán chính xác, xây dựng phác đồ điều trị riêng cho từng cá thể Koi.", img: Fish1, big: true },
  { Icon: Drop,       accent: T.teal,   title: "Kiểm tra chất lượng nước hồ", desc: "Đo và cân bằng pH, NH3, NO2 cùng các chỉ số nước quan trọng.", img: WQ3 },
  { Icon: Microscope, accent: T.goldD,  title: "Xét nghiệm ký sinh trùng",    desc: "Soi mẫu vảy, mang & da để phát hiện sớm mầm bệnh ký sinh.", img: WQ1 },
  { Icon: ShieldTick, accent: T.mid,    title: "Tiêm vaccine phòng bệnh",     desc: "Bảo vệ đàn Koi khỏi các dịch bệnh truyền nhiễm phổ biến.", img: Vaccine1 },
  { Icon: Activity,   accent: "#C8674E",title: "Tiểu phẫu & xử lý vết thương",desc: "Can thiệp ngoại khoa an toàn, xử lý vết thương và lở loét.", img: SpecialCare1 },
  { Icon: Award,      accent: "#5A8A7A",title: "Tư vấn dinh dưỡng cho Koi",   desc: "Thiết kế chế độ ăn giúp Koi lên màu đẹp và khỏe mạnh.", img: Consulting, big: true },
] as const;

const gallery = [
  { src: Fish2, label: "Chăm sóc & theo dõi" },
  { src: Fish3, label: "Tư vấn tại hồ" },
  { src: Fish4, label: "Hồ bệnh viện" },
] as const;

// ─── Services ───────────────────────────────────────────────────────────────
const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative" style={{
      background:`linear-gradient(180deg,
        #081820 0%,
        #0A1E28 18%,
        #0C2230 34%,
        #0A1E28 50%,
        #0C2330 66%,
        #091C26 82%,
        #081820 100%)`,
    }}>

      {/* ══════════════════════════════════════════════════════════ HERO */}
      <section className="relative overflow-hidden pt-32 lg:pt-40">
        {/* soft glows */}
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full blur-[120px]" style={{background:"rgba(29,138,118,0.18)"}}/>
        <div className="pointer-events-none absolute -right-32 top-40 h-[380px] w-[380px] rounded-full blur-[120px]" style={{background:"rgba(217,154,61,0.14)"}}/>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-2 lg:gap-16 lg:px-20">

          {/* Left text */}
          <motion.div variants={vStagger(0.12,0.1)} initial="hidden" animate="show">
            <motion.div variants={vFadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
                <Hospital size={14} variant="Bold" color={T.gold}/>
                Dịch vụ phòng khám cá Koi
              </span>
            </motion.div>

            <motion.h1 variants={vFadeUp}
              className="text-4xl font-bold leading-[1.08] tracking-[-0.01em] text-white lg:text-[3.5rem]">
              Chăm sóc chuyên sâu cho{" "}
              <span style={{
                background:`linear-gradient(125deg,${T.gold} 0%,#DEAD60 48%,${T.gold} 100%)`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>cá Koi của bạn.</span>
            </motion.h1>

            <motion.div variants={vStagger(0.1,0.2)} className="mt-8 space-y-3">
              {[
                { Icon: Hospital, accent: T.coral, text: <>Tìm <span className="font-semibold text-white">nơi điều trị uy tín</span> cho đàn Koi của bạn?</> },
                { Icon: Microscope, accent: T.teal, text: <>Đội ngũ bác sĩ <span className="font-semibold text-white">chuyên sâu về cá Koi</span>, chẩn đoán chính xác.</> },
                { Icon: Drop, accent: T.goldD, text: <>Tại <span className="font-semibold text-white">GenKiKoi</span>, mỗi hồ Koi được theo dõi với quy trình rõ ràng.</> },
              ].map((item, i) => (
                <motion.div key={i} variants={vFadeLeft}
                  className="flex items-start gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm transition-[background-color] duration-300 hover:bg-white/10"
                  style={{background:"rgba(255,255,255,0.04)",borderColor:"rgba(255,255,255,0.09)"}}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{backgroundColor:`${item.accent}28`,border:`1px solid ${item.accent}40`}}>
                    <item.Icon size={20} variant="Bold" color={item.accent}/>
                  </div>
                  <p className="text-base leading-7" style={{color:"rgba(255,255,255,0.7)"}}>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={vFadeUp} className="mt-9">
              <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.96}} transition={SP} className="inline-block">
                <Button size="large" onClick={() => navigate("/booking")}
                  style={{backgroundColor:T.gold,borderColor:T.gold,color:T.bg0}}
                  className="flex items-center gap-2 rounded-full px-7 font-bold shadow-[0_0_32px_rgba(243,215,166,0.28)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(243,215,166,0.45)] hover:!bg-[#F0CA8A]">
                  <Calendar size={17}/>Đặt lịch ngay
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div variants={vStagger(0.14,0.35)} initial="hidden" animate="show" className="relative">
            <motion.div variants={vScale}
              whileHover={{y:-6}} transition={SP}
              className="group relative overflow-hidden rounded-3xl shadow-[0_28px_64px_rgba(0,0,0,0.60)] ring-1 ring-white/10">
              <img src={ServiceBanner} alt="Dịch vụ chăm sóc cá Koi GenKiKoi"
                className="h-full w-full object-cover transition-[transform] duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0" style={{background:"linear-gradient(0deg,rgba(8,24,32,0.72) 0%,transparent 55%)"}}/>
              <div className="absolute inset-0 rounded-3xl ring-inset ring-white/10"/>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ SERVICES */}
      <section className="relative px-6 py-28 lg:px-20">
        <Reveal className="mx-auto max-w-7xl">
          <motion.div variants={vFadeUp} className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.teal}}>Dịch vụ</p>
              <h2 className="text-4xl font-bold leading-[1.1] text-white lg:text-5xl">
                Chăm sóc toàn diện cho{" "}
                <span style={{color:T.gold}}>cá Koi</span>
              </h2>
            </div>
            <p className="max-w-[34ch] text-base leading-7 lg:text-right" style={{color:"rgba(255,255,255,0.5)"}}>
              Từ chẩn đoán đến phục hồi — di chuột để xem chi tiết từng dịch vụ.
            </p>
          </motion.div>

          {/* Bento service grid — mỗi service 1 card có ảnh nền riêng */}
          <motion.div variants={vStagger(0.08)} className="grid gap-4 md:grid-cols-3 lg:auto-rows-[230px]">
            {services.map((s)=>(
              <motion.div key={s.title} variants={vScale}
                whileHover={{y:-6}} transition={SP}
                onClick={()=>navigate("/booking")}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border ${("big" in s && s.big)?"md:col-span-2 md:row-span-1":""}`}
                style={{borderColor:"rgba(255,255,255,0.08)",background:T.bg2}}>
                {/* BG image */}
                <img src={s.img} alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-60"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(120deg,rgba(8,24,32,0.92) 0%,rgba(8,24,32,0.55) 100%)"}}/>
                {/* Content */}
                <div className="relative flex h-full min-h-[200px] flex-col justify-between p-6">
                  <motion.div whileHover={{scale:1.1,rotate:-4}} transition={SP}
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{backgroundColor:`${s.accent}28`,border:`1px solid ${s.accent}55`}}>
                    <s.Icon size={24} variant="Bold" color={s.accent}/>
                  </motion.div>
                  <div>
                    <h3 className={`font-bold text-white ${("big" in s && s.big)?"text-2xl":"text-lg"}`}>{s.title}</h3>
                    <p className="mt-1.5 max-w-[40ch] text-sm leading-6" style={{color:"rgba(255,255,255,0.55)"}}>{s.desc}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{color:T.gold}}>
                      Đặt lịch ngay <ArrowRight2 size={15}/>
                    </div>
                  </div>
                </div>
                {/* accent corner line */}
                <div className="absolute left-0 top-0 h-1 w-0 transition-[width] duration-300 group-hover:w-full" style={{background:s.accent}}/>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════════ GALLERY */}
      <section className="relative px-6 py-28 lg:px-20">
        <Reveal className="mx-auto max-w-7xl">
          <motion.div variants={vFadeUp} className="mb-12">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.gold}}>Khoảnh khắc</p>
            <h2 className="text-4xl font-bold leading-[1.1] text-white lg:text-5xl">
              Quy trình <span style={{color:T.gold}}>chăm sóc</span>
            </h2>
          </motion.div>

          <motion.div variants={vStagger(0.08)} className="grid gap-4 md:grid-cols-3">
            {gallery.map((img)=>(
              <motion.div key={img.label} variants={vScale}
                whileHover={{y:-6}} transition={SP}
                className="group relative h-[300px] overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                style={{background:T.bg2}}>
                <img src={img.src} alt={img.label}
                  className="h-full w-full object-cover opacity-70 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-100"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(0deg,rgba(8,24,32,0.88) 0%,transparent 55%)"}}/>
                <p className="absolute bottom-5 left-5 text-base font-bold text-white/70 transition-colors duration-300 group-hover:text-white">
                  {img.label}
                </p>
                <div className="absolute left-0 top-0 h-1 w-0 transition-[width] duration-300 group-hover:w-full" style={{background:T.gold}}/>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════════════ CTA */}
      <section className="relative px-6 pb-32 lg:px-20">
        <Reveal className="mx-auto max-w-7xl">
          <motion.div variants={vScale}
            className="relative overflow-hidden rounded-3xl border px-8 py-14 text-center lg:px-16 lg:py-20"
            style={{background:T.bg2,borderColor:"rgba(255,255,255,0.09)",boxShadow:"0 32px 80px rgba(0,0,0,0.5)"}}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[100px]" style={{background:"rgba(243,215,166,0.15)"}}/>
            <motion.p variants={vFadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.teal}}>Sẵn sàng?</motion.p>
            <motion.h2 variants={vFadeUp} className="mx-auto max-w-2xl text-3xl font-bold leading-[1.15] text-white lg:text-4xl">
              Đặt lịch khám cho{" "}
              <span style={{color:T.gold}}>đàn Koi của bạn</span> ngay hôm nay
            </motion.h2>
            <motion.div variants={vFadeUp} className="mt-9">
              <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.96}} transition={SP} className="inline-block">
                <Button size="large" onClick={()=>navigate("/booking")}
                  style={{backgroundColor:T.gold,borderColor:T.gold,color:T.bg0}}
                  className="flex items-center gap-2 rounded-full px-8 font-bold shadow-[0_0_32px_rgba(243,215,166,0.28)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(243,215,166,0.45)] hover:!bg-[#F0CA8A]">
                  <Calendar size={17}/>Đặt lịch ngay <ArrowRight2 size={16}/>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Reveal>
      </section>

    </div>
  );
};

export default Services;
