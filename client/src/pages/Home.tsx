import { Avatar, Button, Rate } from "antd";
import {
  Activity,
  ArrowRight2,
  Award,
  Calendar,
  Call,
  Drop,
  EmojiHappy,
  HeartTick,
  Hospital,
  Microscope,
  Moneys,
  Profile2User,
  ShieldTick,
  Star,
  User,
} from "iconsax-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";

import Background from "../assets/background.webp";
import Image1 from "../assets/Image2.jpg";
import Image2 from "../assets/Image1.jpg";
import Image3 from "../assets/Image3.jpg";
import Fish1 from "../assets/fish-care-1.jpg";
import Fish2 from "../assets/fish-care-2.webp";
import Fish3 from "../assets/fish-care-3.jpg";
import Fish4 from "../assets/fish-care-4.jpg";
import WQ1 from "../assets/water-quality-1.jpg";
import WQ2 from "../assets/water-quality-2.jpg";
import WQ3 from "../assets/water-quality-3.jpg";
import Center1 from "../assets/center-1.jpg";
import Vaccine1 from "../assets/vaccine-1.jpg";
import SpecialCare1 from "../assets/special-care-1.jpg";
import Consulting from "../assets/consulting.webp";
const KoiModel = lazy(() => import("../components/KoiModel"));

// ─── Palette ──────────────────────────────────────────────────────────────────
const T = {
  bg0:  "#081820",   // deepest bg
  bg1:  "#0D2430",   // section bg dark
  bg2:  "#122B38",   // surface bg
  bg3:  "#1A3848",   // card surface
  gold: "#F3D7A6",
  goldD:"#D99A3D",
  teal: "#1D8A76",
  coral:"#E8725A",
  mid:  "#3A6B7E",
} as const;

// ─── Static data ──────────────────────────────────────────────────────────────
const reasons = [
  { Icon: EmojiHappy, title: "Cam kết hài lòng",   sub: "300+ khách tin tưởng",       accent: T.coral },
  { Icon: Moneys,     title: "Thanh toán linh hoạt",sub: "Nhiều hình thức tiện lợi",   accent: T.goldD },
  { Icon: HeartTick,  title: "Không gian an toàn",  sub: "Sạch sẽ & hiện đại",         accent: T.teal  },
  { Icon: Star,       title: "Ưu đãi thường xuyên", sub: "Khuyến mãi hàng tháng",      accent: T.mid   },
];

const services = [
  { Icon: Hospital,   accent: T.coral, title: "Khám & điều trị bệnh cá Koi", desc: "Chẩn đoán chính xác, phác đồ điều trị riêng cho từng cá thể.", img: Fish1, big: true },
  { Icon: Drop,       accent: T.teal,  title: "Kiểm tra chất lượng nước hồ", desc: "Đo & cân bằng các chỉ số nước.", img: WQ3 },
  { Icon: Microscope, accent: T.goldD, title: "Xét nghiệm ký sinh trùng",    desc: "Soi mẫu, phát hiện sớm mầm bệnh.", img: WQ1 },
  { Icon: ShieldTick, accent: T.mid,   title: "Tiêm vaccine phòng bệnh",     desc: "Bảo vệ đàn Koi khỏi dịch bệnh.", img: Vaccine1 },
  { Icon: Activity,   accent:"#C8674E",title: "Tiểu phẫu & xử lý vết thương",desc: "Can thiệp ngoại khoa an toàn.", img: SpecialCare1 },
  { Icon: Award,      accent:"#5A8A7A",title: "Tư vấn dinh dưỡng cho Koi",   desc: "Chế độ ăn lên màu & khỏe mạnh.", img: Consulting },
];

const gallery = [
  { src: Fish1,   label: "Kiểm tra sức khỏe",    cls: "col-span-2 row-span-2" },
  { src: WQ1,     label: "Kiểm tra nước hồ",     cls: "" },
  { src: Fish3,   label: "Tư vấn tại hồ",        cls: "" },
  { src: Center1, label: "Phòng khám",            cls: "" },
  { src: Fish4,   label: "Hồ bệnh viện",          cls: "" },
  { src: WQ2,     label: "Chất lượng nước",       cls: "" },
  { src: Fish2,   label: "Phục hồi sau điều trị", cls: "col-span-2" },
];

const commitments = [
  { n:"01", title:"Uy tín",    accent:T.coral, sub:"Bác sĩ nhiều năm kinh nghiệm, hàng trăm khách đánh giá cao."     },
  { n:"02", title:"Chất lượng",accent:T.goldD, sub:"Chuyên sâu cá Koi, quy trình điều trị chuẩn và minh bạch."       },
  { n:"03", title:"Tận tâm",   accent:T.teal,  sub:"Theo dõi sát từng bước phục hồi, không chỉ điều trị một lần."    },
];

// ─── Motion primitives ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const vFadeUp   = { hidden:{opacity:0,y:36},  show:{opacity:1,y:0,  transition:{duration:0.72,ease}} };
const vFadeLeft = { hidden:{opacity:0,x:-32}, show:{opacity:1,x:0,  transition:{duration:0.65,ease}} };
const vScale    = { hidden:{opacity:0,scale:0.86}, show:{opacity:1,scale:1,transition:{duration:0.65,ease}} };
const vStagger  = (s=0.09,d=0)=>({ hidden:{}, show:{transition:{staggerChildren:s,delayChildren:d}} });
const SP = { type:"spring", stiffness:260, damping:22 } as const;

// ─── TiltCard — 3-D mouse tilt ────────────────────────────────────────────────
function TiltCard({ children, className="", style }:{children:React.ReactNode;className?:string;style?:React.CSSProperties}) {
  const ref  = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const rotX = useSpring(useTransform(my,[-0.5,0.5],[7,-7]),{stiffness:180,damping:20});
  const rotY = useSpring(useTransform(mx,[-0.5,0.5],[-7,7]),{stiffness:180,damping:20});
  return (
    <motion.div ref={ref}
      onMouseMove={e=>{
        if(!ref.current) return;
        const r=ref.current.getBoundingClientRect();
        mx.set((e.clientX-r.left)/r.width -0.5);
        my.set((e.clientY-r.top) /r.height-0.5);
      }}
      onMouseLeave={()=>{mx.set(0);my.set(0);}}
      style={{...style,rotateX:rotX,rotateY:rotY,transformStyle:"preserve-3d",perspective:1000}}
      className={className}
    >{children}</motion.div>
  );
}

// ─── CountUp ─────────────────────────────────────────────────────────────────
function CountUp({to,suffix=""}:{to:number;suffix?:string}) {
  const ref=useRef<HTMLSpanElement>(null);
  const iv=useInView(ref,{once:true});
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!iv)return;
    let c=0; const step=to/50;
    const id=setInterval(()=>{ c+=step; if(c>=to){setV(to);clearInterval(id);}else setV(Math.floor(c)); },24);
    return ()=>clearInterval(id);
  },[iv,to]);
  return <span ref={ref} className="tabular-nums">{v}{suffix}</span>;
}

// ─── Reveal — stagger container, fires via whileInView (per-section) ─────────
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

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate=useNavigate();
  const [feedbacks,setFeedbacks]=useState<any[]>([]);

  useEffect(()=>{
    handleAPI("/api/feedbacks/public",undefined,"GET").then(r=>setFeedbacks(r.data??[])).catch(()=>{});
    window.scrollTo(0,0);
  },[]);

  return (
    <div className="relative" style={{
      // Gradient liền mạch chảy suốt toàn trang — không còn ranh giới section
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
      <section className="relative min-h-[100dvh] overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <img src={Background} alt="" className="h-full w-full object-cover" style={{willChange:"transform"}}/>
          {/* layered dark-luxe overlay: base dark + left vignette + bottom vignette */}
          <div className="absolute inset-0" style={{background:"rgba(8,24,32,0.78)"}}/>
          <div className="absolute inset-0" style={{background:"linear-gradient(90deg,rgba(8,24,32,0.95) 0%,rgba(8,24,32,0.55) 55%,transparent 100%)"}}/>
          {/* bottom fade → tan hẳn vào #081820 của gradient trang */}
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{background:"linear-gradient(0deg,#081820 0%,rgba(8,24,32,0.4) 40%,transparent 100%)"}}/>
        </div>

        {/* Content grid */}
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1600px] items-center gap-10 px-8 lg:gap-16 lg:px-24"
             style={{gridTemplateColumns:"1fr auto"}}>

          {/* Left text */}
          <motion.div className="flex-1 py-28 lg:max-w-[600px]"
            variants={vStagger(0.12,0.15)} initial="hidden" animate="show">

            <motion.div variants={vFadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
                <Drop size={13} variant="Bold" color={T.gold}/>
                Phòng khám thú y chuyên cá Koi
              </span>
            </motion.div>

            <motion.h1 variants={vFadeUp}
              className="text-5xl font-bold leading-[1.05] tracking-[-0.01em] text-white lg:text-[3.75rem]">
              Hơn cả{" "}<br/>
              <span style={{
                background:`linear-gradient(125deg,${T.gold} 0%,#DEAD60 48%,${T.gold} 100%)`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>sự hài lòng.</span>
            </motion.h1>

            <motion.p variants={vFadeUp} className="mt-5 max-w-[44ch] text-base leading-7" style={{color:"rgba(255,255,255,0.65)"}}>
              Đội ngũ bác sĩ trẻ, tận tâm, chuyên sâu về cá Koi.<br/>
              Uy tín — Chất lượng — Tận tâm.
            </motion.p>

            <motion.div variants={vFadeUp} className="mt-9 flex flex-wrap gap-3">
              {[
                {label:"Gọi tổng đài",  Icon:Call,        solid:true,  onClick:()=>window.open("https://zalo.me/0888500703","_blank")},
                {label:"Đặt lịch hẹn", Icon:Calendar,    solid:false, onClick:()=>navigate("/booking")},
                {label:"Tìm bác sĩ",   Icon:Profile2User, solid:false, onClick:()=>navigate("/doctors")},
              ].map(btn=>(
                <motion.div key={btn.label} whileHover={{scale:1.05}} whileTap={{scale:0.96}} transition={SP}>
                  {btn.solid
                    ? <Button size="large" onClick={btn.onClick}
                        style={{backgroundColor:T.gold,borderColor:T.gold,color:T.bg0}}
                        className="flex items-center gap-2 rounded-full px-7 font-bold shadow-[0_0_32px_rgba(243,215,166,0.28)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(243,215,166,0.45)] hover:!bg-[#F0CA8A]">
                        <btn.Icon size={17}/>{btn.label}
                      </Button>
                    : <Button ghost size="large" onClick={btn.onClick}
                        style={{borderColor:"rgba(255,255,255,0.28)",color:"rgba(255,255,255,0.85)"}}
                        className="flex items-center gap-2 rounded-full px-7 font-bold transition-[background-color] duration-200 hover:!bg-white/10">
                        <btn.Icon size={17}/>{btn.label}
                      </Button>
                  }
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={vFadeUp} className="mt-10 flex gap-8 border-t pt-8" style={{borderColor:"rgba(255,255,255,0.1)"}}>
              {[{to:300,suf:"+",lbl:"Khách hàng"},{to:6,suf:"",lbl:"Dịch vụ"},{to:8,suf:" năm",lbl:"Kinh nghiệm"}].map(s=>(
                <div key={s.lbl}>
                  <p className="text-3xl font-bold text-white"><CountUp to={s.to} suffix={s.suf}/></p>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em]" style={{color:"rgba(255,255,255,0.38)"}}>{s.lbl}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3 tilt cards, appear from md */}
          <motion.div className="hidden shrink-0 items-end gap-3 py-28 md:flex"
            variants={vStagger(0.14,0.5)} initial="hidden" animate="show">
            {[
              {src:Image1, h:"h-[260px] lg:h-[288px]", w:"w-[160px] lg:w-[192px]"},
              {src:Image2, h:"h-[320px] lg:h-[352px]", w:"w-[160px] lg:w-[192px]", mb:"mb-10"},
              {src:Image3, h:"h-[260px] lg:h-[288px]", w:"w-[160px] lg:w-[192px]"},
            ].map((img,i)=>(
              <motion.div key={i} variants={vScale} className={img.mb??""}>
                <TiltCard className={`${img.w} ${img.h} overflow-hidden rounded-2xl shadow-[0_28px_64px_rgba(0,0,0,0.60)] ring-1 ring-white/10`}>
                  <img src={img.src} alt="" className="h-full w-full object-cover"/>
                  <div className="absolute inset-0 rounded-2xl ring-inset ring-white/10"/>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll mouse */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{y:[0,7,0]}} transition={{repeat:Infinity,duration:2.3,ease:"easeInOut"}}>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/22 pt-1.5">
            <div className="h-[7px] w-[3px] rounded-full bg-white/50"/>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════ WHY */}
      <section className="relative overflow-hidden px-6 py-28 lg:px-20">
        {/* Off-center luminous wash — gives the dark stage one light source */}
        <div aria-hidden className="pointer-events-none absolute -top-24 right-[8%] h-[440px] w-[440px] rounded-full opacity-[0.10] blur-[120px]"
          style={{background:`radial-gradient(circle,${T.gold} 0%,transparent 70%)`}}/>

        <Reveal className="relative mx-auto max-w-7xl">
          {/* Heading — offset, not centered */}
          <div className="mb-14 max-w-2xl">
            <motion.p variants={vFadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.teal}}>
              Tại sao chọn chúng tôi
            </motion.p>
            <motion.h2 variants={vFadeUp} className="text-4xl font-bold leading-[1.08] text-white lg:text-5xl">
              Tiêu chuẩn chăm sóc{" "}
              <span style={{color:T.gold}}>cá Koi cao cấp</span>
            </motion.h2>
          </div>

          {/* ── Asymmetric bento: hero reason + offset rail + stats slab ── */}
          <motion.div variants={vStagger(0.1)}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[156px]">

            {/* Dominant tile — first reason, large, glowing */}
            {(() => {
              const r = reasons[0];
              return (
                <motion.div variants={vScale}
                  className="group relative col-span-1 overflow-hidden rounded-3xl border p-7 md:col-span-2 lg:col-span-5 lg:row-span-2"
                  style={{background:`linear-gradient(155deg, ${r.accent}1f 0%, ${T.bg2} 55%)`,borderColor:`${r.accent}30`}}>
                  {/* Big index watermark */}
                  <span className="pointer-events-none absolute -bottom-6 right-2 text-[160px] font-black leading-none tracking-tighter"
                    style={{color:"rgba(255,255,255,0.04)"}}>01</span>
                  {/* Specular sweep on hover */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-full"/>
                  <div className="relative flex h-full flex-col">
                    <motion.div whileHover={{scale:1.08,rotate:-4}} transition={SP}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{backgroundColor:`${r.accent}2e`,border:`1px solid ${r.accent}55`}}>
                      <r.Icon size={30} variant="Bold" color={r.accent}/>
                    </motion.div>
                    <div className="mt-auto pt-8">
                      <h3 className="text-2xl font-bold text-white lg:text-[28px]">{r.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6" style={{color:"rgba(255,255,255,0.55)"}}>{r.sub}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Two offset rail tiles — accent left-border, varied, no equal-card feel */}
            {reasons.slice(1,3).map((r,i)=>(
              <motion.div key={r.title} variants={vFadeUp}
                className="group relative col-span-1 overflow-hidden rounded-3xl border p-6 backdrop-blur-sm lg:col-span-4"
                style={{background:"rgba(255,255,255,0.035)",borderColor:"rgba(255,255,255,0.09)",borderLeft:`3px solid ${r.accent}`}}>
                <span className="pointer-events-none absolute right-4 top-4 text-xs font-bold tabular-nums tracking-widest" style={{color:`${r.accent}99`}}>
                  0{i+2}
                </span>
                <motion.div whileHover={{scale:1.1,rotate:-4}} transition={SP}
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{backgroundColor:`${r.accent}26`,border:`1px solid ${r.accent}40`}}>
                  <r.Icon size={22} variant="Bold" color={r.accent}/>
                </motion.div>
                <h3 className="mt-5 font-bold text-white">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-6" style={{color:"rgba(255,255,255,0.45)"}}>{r.sub}</p>
              </motion.div>
            ))}

            {/* Stats slab — tall, lives inside the grid as a vertical counterweight */}
            <motion.div variants={vScale}
              className="col-span-1 flex flex-col justify-center gap-6 rounded-3xl border px-7 py-6 md:col-span-2 lg:col-span-3 lg:row-span-2"
              style={{background:T.bg1,borderColor:"rgba(255,255,255,0.09)"}}>
              {[
                {to:300,suf:"+",lbl:"Khách hàng",c:T.coral},
                {to:6,  suf:"", lbl:"Dịch vụ",  c:T.teal},
                {to:8,  suf:"", lbl:"Năm kinh nghiệm",c:T.goldD},
              ].map((s,i)=>(
                <div key={s.lbl} className={i>0?"border-t pt-5":""} style={{borderColor:"rgba(255,255,255,0.07)"}}>
                  <p className="text-4xl font-bold tabular-nums lg:text-5xl" style={{color:s.c}}>
                    <CountUp to={s.to} suffix={s.suf}/>
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{color:"rgba(255,255,255,0.32)"}}>
                    {s.lbl}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Fourth reason — wide low tile spanning under the dominant + rail */}
            {(() => {
              const r = reasons[3];
              return (
                <motion.div variants={vFadeUp}
                  className="group relative col-span-1 flex items-center gap-5 overflow-hidden rounded-3xl border p-6 md:col-span-2 lg:col-span-9"
                  style={{background:"rgba(255,255,255,0.035)",borderColor:"rgba(255,255,255,0.09)"}}>
                  <motion.div whileHover={{scale:1.1,rotate:-4}} transition={SP}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{backgroundColor:`${r.accent}26`,border:`1px solid ${r.accent}40`}}>
                    <r.Icon size={24} variant="Bold" color={r.accent}/>
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white">{r.title}</h3>
                    <p className="mt-1 text-sm leading-6" style={{color:"rgba(255,255,255,0.45)"}}>{r.sub}</p>
                  </div>
                  <div className="ml-auto hidden h-[2px] w-8 shrink-0 rounded-full transition-[width] duration-300 group-hover:w-16 sm:block"
                    style={{backgroundColor:r.accent}}/>
                </motion.div>
              );
            })()}
          </motion.div>

          {/* CTA */}
          <motion.div variants={vFadeUp} className="mt-12">
            <motion.div whileHover={{x:5}} transition={SP} className="inline-block">
              <Button ghost size="large" onClick={()=>navigate("/about-us")}
                style={{backgroundColor:"transparent",borderColor:"rgba(255,255,255,0.25)",color:"#fff"}}
                className="flex items-center gap-2 rounded-full border px-7 font-bold transition-[background-color,border-color] duration-200 hover:!bg-white/10 hover:!border-white/40 hover:!text-white">
                Về chúng tôi <ArrowRight2 size={17}/>
              </Button>
            </motion.div>
          </motion.div>

        </Reveal>
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
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border ${s.big?"md:col-span-2 md:row-span-1":""}`}
                style={{borderColor:"rgba(255,255,255,0.08)",background:T.bg2}}>
                {/* BG image */}
                <img src={s.img} alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-55"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(120deg,rgba(8,24,32,0.92) 0%,rgba(8,24,32,0.55) 100%)"}}/>
                {/* Content */}
                <div className="relative flex h-full min-h-[200px] flex-col justify-between p-6">
                  <motion.div whileHover={{scale:1.1,rotate:-4}} transition={SP}
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{backgroundColor:`${s.accent}28`,border:`1px solid ${s.accent}55`}}>
                    <s.Icon size={24} variant="Bold" color={s.accent}/>
                  </motion.div>
                  <div>
                    <h3 className={`font-bold text-white ${s.big?"text-2xl":"text-lg"}`}>{s.title}</h3>
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
          <motion.div variants={vFadeUp} className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.gold}}>Hình ảnh</p>
              <h2 className="text-4xl font-bold leading-[1.1] text-white lg:text-5xl">
                Khoảnh khắc <span style={{color:T.gold}}>chăm sóc</span>
              </h2>
            </div>
            <motion.div whileHover={{x:4}} transition={SP} className="hidden lg:block">
              <Button ghost onClick={()=>navigate("/images")}
                style={{backgroundColor:"transparent",borderColor:"rgba(255,255,255,0.22)",color:"#fff"}}
                className="flex items-center gap-2 rounded-full border px-5 font-bold transition-[border-color,color] duration-200 hover:!border-[#D99A3D] hover:!text-[#D99A3D]">
                Xem thêm <ArrowRight2 size={16}/>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={vStagger(0.07)}
            className="grid auto-rows-[200px] gap-3 md:auto-rows-[240px] md:grid-cols-4">
            {gallery.map(img=>(
              <motion.div key={img.label} variants={vScale}
                whileHover={{scale:1.025,zIndex:10}} transition={SP}
                className={`group relative overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] ${img.cls}`}
                style={{background:T.bg2}}>
                <img src={img.src} alt={img.label}
                  className="h-full w-full object-cover opacity-72 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-100"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(0deg,rgba(8,24,32,0.88) 0%,transparent 55%)"}}/>
                <p className="absolute bottom-4 left-4 text-sm font-bold text-white/70 transition-colors duration-300 group-hover:text-white">
                  {img.label}
                </p>
                <div className="absolute inset-0 rounded-2xl ring-inset ring-white/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-white/14"/>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════ FEEDBACKS */}
      <section className="relative px-6 py-28 lg:px-20">
        <Reveal className="mx-auto max-w-7xl">
          <motion.div variants={vFadeUp} className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.teal}}>Đánh giá</p>
            <h2 className="text-4xl font-bold text-white lg:text-5xl">Khách hàng nói gì?</h2>
          </motion.div>

          <motion.div variants={vStagger(0.12)} className="grid gap-5 md:grid-cols-3">
            {(feedbacks.length>0?feedbacks.slice(0,3):[]).map((fb,i)=>(
              <motion.div key={i} variants={vFadeUp}
                whileHover={{y:-8}} transition={SP}
                className="flex flex-col justify-between rounded-2xl border p-6 transition-[border-color,box-shadow] duration-200 hover:border-white/16"
                style={{background:T.bg2,borderColor:"rgba(255,255,255,0.08)",
                  boxShadow:"0 16px 48px rgba(0,0,0,0.35)"}}>
                <div>
                  <span className="block font-serif text-5xl leading-none" style={{color:T.gold}}>"</span>
                  <Rate disabled defaultValue={fb.rating} className="mt-1 block text-xs"/>
                  <p className="mt-3 text-base leading-7" style={{color:"rgba(255,255,255,0.85)"}}>{fb.comment}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em]" style={{color:T.goldD}}>{fb.serviceName}</p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t pt-5" style={{borderColor:"rgba(255,255,255,0.08)"}}>
                  <Avatar size={42} src={fb.customerAvatar} icon={<User/>}
                    className="shrink-0" style={{border:`2px solid ${T.gold}`}}/>
                  <div>
                    <p className="font-bold text-white">{fb.customerName}</p>
                    <p className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>
                      {new Date(fb.feedbackDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════ EXPECTED */}
      <section className="relative px-6 py-28 lg:px-20">
        <Reveal className="mx-auto max-w-7xl">
          <motion.div variants={vFadeUp} className="mb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{color:T.gold}}>Cam kết</p>
            <h2 className="text-4xl font-bold text-white lg:text-5xl">
              Những gì bạn nhận được<br/>
              <span style={{color:T.gold}}>từ GenKiKoi</span>
            </h2>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <motion.div variants={vStagger(0.12)} className="space-y-4">
              {commitments.map(it=>(
                <motion.div key={it.title} variants={vFadeLeft}
                  whileHover={{x:10}} transition={SP}
                  className="flex gap-5 rounded-2xl border p-6 backdrop-blur-sm transition-[background-color,border-color] duration-200 hover:bg-white/10"
                  style={{background:"rgba(255,255,255,0.04)",borderColor:"rgba(255,255,255,0.09)"}}>
                  <motion.div whileHover={{scale:1.1,rotate:4}} transition={SP}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white"
                    style={{backgroundColor:it.accent,boxShadow:"0 8px 24px rgba(0,0,0,0.35)"}}>
                    {it.n}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{it.title}</h3>
                    <p className="mt-1.5 text-sm leading-6" style={{color:"rgba(255,255,255,0.55)"}}>{it.sub}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={vFadeLeft}
                className="flex items-center gap-4 rounded-2xl border px-6 py-5"
                style={{background:"rgba(255,255,255,0.04)",borderColor:"rgba(255,255,255,0.09)"}}>
                <p className="font-bold text-white">Sẵn sàng đặt lịch?</p>
                <motion.div whileHover={{scale:1.06}} whileTap={{scale:0.96}} transition={SP} className="ml-auto">
                  <Button size="large" onClick={()=>navigate("/booking")}
                    style={{backgroundColor:T.gold,borderColor:T.gold,color:T.bg0}}
                    className="rounded-full px-6 font-bold shadow-[0_0_28px_rgba(243,215,166,0.22)] transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(243,215,166,0.40)] hover:!bg-[#F0CA8A]">
                    Đặt lịch ngay <ArrowRight2 size={16} className="ml-1"/>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={vScale} className="relative">
              {/* Koi floats free — no card behind it */}
              <div className="pointer-events-none relative z-30 aspect-[4/5] w-full drop-shadow-[0_28px_60px_rgba(0,0,0,0.6)]">
                <Suspense fallback={<div className="h-full w-full" />}>
                  <KoiModel className="h-full w-full" />
                </Suspense>
              </div>
              {/* Caption card tucks under the koi */}
              <div className="-mt-6 rounded-3xl border px-6 pb-6 pt-10"
                style={{background:T.bg2,borderColor:"rgba(255,255,255,0.09)",boxShadow:"0 32px 80px rgba(0,0,0,0.55)"}}>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{color:T.gold}}>GenKiKoi Care</p>
                <p className="mt-2 font-bold leading-6 text-white">Theo dõi, tư vấn và điều trị trong một quy trình rõ ràng.</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
