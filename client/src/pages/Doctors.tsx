import { Button, message, Spin } from "antd";
import { ArrowRight2, Award, Calendar, Profile2User, Truck, User } from "iconsax-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";

// ─── Palette ──────────────────────────────────────────────────────────────────
const T = {
  bg0: "#081820",
  bg1: "#0D2430",
  bg2: "#122B38",
  bg3: "#1A3848",
  gold: "#F3D7A6",
  goldD: "#D99A3D",
  teal: "#1D8A76",
  coral: "#E8725A",
  mid: "#3A6B7E",
} as const;

// ─── Motion primitives ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;
const vFadeUp = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.72, ease } } };
const vScale = { hidden: { opacity: 0, scale: 0.86 }, show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease } } };
const vStagger = (s = 0.09, d = 0) => ({ hidden: {}, show: { transition: { staggerChildren: s, delayChildren: d } } });
const SP = { type: "spring", stiffness: 260, damping: 22 } as const;

// ─── Reveal — stagger container, fires via whileInView ────────────────────────
function Reveal({
  children,
  className = "",
  stag = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stag?: number;
  delay?: number;
}) {
  return (
    <motion.div
      variants={vStagger(stag, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Doctors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [doctors, setDoctors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        setIsLoading(true);
        const api = `/api/doctors/`;
        const res = await handleAPI(api, undefined, "GET");

        if (res.data) {
          setDoctors(res.data);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!");
      } finally {
        setIsLoading(false);
      }
    };
    getDoctors();
  }, []);

  const handleViewDetails = (doctorId: string) => {
    navigate(`/doctors/${doctorId}`);
  };
  const handleBooking = () => {
    navigate(`/booking`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: T.bg0 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className="relative"
      style={{
        background: `linear-gradient(180deg,
          #081820 0%,
          #0A1E28 18%,
          #0C2230 34%,
          #0A1E28 50%,
          #0C2330 66%,
          #091C26 82%,
          #081820 100%)`,
      }}
    >
      <section className="relative overflow-hidden px-6 pb-28 pt-44 lg:px-20">
        {/* Off-center luminous wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-[10%] h-[440px] w-[440px] rounded-full opacity-10 blur-[120px]"
          style={{ background: `radial-gradient(circle,${T.gold} 0%,transparent 70%)` }}
        />

        <Reveal className="relative mx-auto max-w-7xl">
          {/* ── Hero header ── */}
          <div className="mb-16 max-w-3xl">
            <motion.p
              variants={vFadeUp}
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: T.teal }}
            >
              Đội ngũ
            </motion.p>
            <motion.h1
              variants={vFadeUp}
              className="text-4xl font-bold leading-[1.08] text-white lg:text-5xl"
            >
              Đội ngũ <span style={{ color: T.gold }}>bác sĩ tại GenKiKoi</span>
            </motion.h1>
            <motion.p
              variants={vFadeUp}
              className="mt-5 max-w-[52ch] text-base leading-7"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Chuyên sâu về cá Koi, tận tâm theo dõi sức khỏe từng cá thể trong hồ của bạn.
            </motion.p>
          </div>

          {/* ── Doctor cards grid ── */}
          <motion.div
            variants={vStagger(0.1)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {doctors.map((doctor: any, index: number) => {
              const photo = doctor.photoUrl || doctor.image;
              return (
                <motion.div
                  key={doctor._id ?? index}
                  variants={vScale}
                  whileHover={{ y: -8 }}
                  transition={SP}
                  className="group relative overflow-hidden rounded-3xl border"
                  style={{
                    background: T.bg2,
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Photo with bottom gradient overlay */}
                  <div className="relative h-72 w-full overflow-hidden">
                    {photo ? (
                      <img
                        alt={doctor.fullName}
                        src={photo}
                        className="h-full w-full object-cover transition-[transform] duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: T.bg3 }}>
                        <User size={120} color="rgba(255,255,255,0.25)" />
                      </div>
                    )}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(0deg,rgba(18,43,56,0.96) 0%,rgba(18,43,56,0.35) 45%,transparent 100%)",
                      }}
                    />
                    {/* Experience badge */}
                    {typeof doctor.yearOfExperience === "number" && (
                      <div
                        className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(8,24,32,0.65)", border: `1px solid ${T.gold}40`, color: T.gold }}
                      >
                        <Award size={14} variant="Bold" color={T.gold} />
                        {doctor.yearOfExperience} năm
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="relative -mt-10 flex flex-col p-6">
                    <h3 className="text-xl font-bold text-white">{doctor.fullName}</h3>
                    <p className="mt-1.5 flex items-center gap-2 text-sm" style={{ color: T.gold }}>
                      <Profile2User size={15} variant="Bold" color={T.gold} />
                      {doctor.specialization || "Chuyên gia chăm sóc cá Koi"}
                    </p>
                    {doctor.movingService && (
                      <p className="mt-2 flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <Truck size={14} color={T.teal} />
                        Có dịch vụ khám tại nhà
                      </p>
                    )}
                    {doctor.introduction && (
                      <p className="mt-3 text-sm leading-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {doctor.introduction.length > 120
                          ? doctor.introduction.slice(0, 117) + "..."
                          : doctor.introduction}
                      </p>
                    )}

                    <div className="mt-6 flex gap-3">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={SP} className="flex-1">
                        <Button
                          ghost
                          block
                          onClick={() => handleViewDetails(doctor._id)}
                          style={{ backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}
                          className="flex items-center justify-center gap-1.5 rounded-full font-bold transition-[background-color,border-color] duration-200 hover:!border-white/40 hover:!bg-white/10 hover:!text-white"
                        >
                          Xem chi tiết <ArrowRight2 size={16} />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={SP} className="flex-1">
                        <Button
                          block
                          onClick={() => handleBooking()}
                          style={{ backgroundColor: T.gold, borderColor: T.gold, color: T.bg0 }}
                          className="flex items-center justify-center gap-1.5 rounded-full font-bold shadow-[0_0_24px_rgba(243,215,166,0.2)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(243,215,166,0.4)] hover:!bg-[#F0CA8A]"
                        >
                          <Calendar size={16} /> Đặt lịch
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
};

export default Doctors;
