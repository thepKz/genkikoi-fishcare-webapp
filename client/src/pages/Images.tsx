import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCompress, FaExpand, FaTimes } from "react-icons/fa";

import Center1 from "../assets/center-2.jpg"; // khu vuc dieu tri
import Center2 from "../assets/center-4.jpg";
import Center3 from "../assets/center-5.jpg";
import Center4 from "../assets/fish-care-1.jpg";
import Center5 from "../assets/fish-care-2.webp";

import Center7 from "../assets/doctor-1.jpg"; // doi ngu bac si
import Center8 from "../assets/doctor-2.jpg"; // doi ngu bac si
import Center9 from "../assets/doctor-3.jpg"; // doi ngu bac si
import Center6 from "../assets/fish-care-4.jpg"; // doi ngu bac si

import Center10 from "../assets/special-care-1.jpg"; //khu vuc cham soc dac biet
import Center11 from "../assets/special-care-2.jpg"; //khu vuc cham soc dac biet

import Center13 from "../assets/center-1.jpg"; //khu vuc tiep don
import Center12 from "../assets/center-3.jpg"; //khu vuc tiep don

import Center14 from "../assets/water-quality-1.jpg"; // ho ca
import Center16 from "../assets/water-quality-3.jpg"; // ho ca
import Center17 from "../assets/water-quality-4.jpg"; // ho ca
import Center15 from "../assets/water-quality-5.jpg"; // ho ca
import Center18 from "../assets/water-quality-6.jpg"; // ho ca
import Center19 from "../assets/water-quality-7.jpg"; // ho ca

import Center24 from "../assets/center-10.png"; // ca benh
import Center23 from "../assets/center-10.webp"; // ca benh
import Center25 from "../assets/center-11.webp"; // ca benh
import Center20 from "../assets/center-7.jpg"; // ca benh
import Center21 from "../assets/center-8.jpg"; // ca benh
import Center22 from "../assets/center-9.jpg"; // ca benh

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

// ─── Category filter options ──────────────────────────────────────────────────
const categories = [
  { value: "all", label: "Tất cả" },
  { value: "treatment", label: "Khu điều trị" },
  { value: "pond", label: "Hồ cá Koi" },
  { value: "staff", label: "Đội ngũ bác sĩ" },
  { value: "sick-fish", label: "Cá bị bệnh" },
  { value: "reception", label: "Khu tiếp đón" },
  { value: "special-care", label: "Chăm sóc đặc biệt" },
] as const;

const Images = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = [
    { src: Center1, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center2, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center14, alt: "Hồ cá Koi", category: "pond" },
    { src: Center12, alt: "Khu vực tiếp đón", category: "reception" },
    { src: Center6, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center24, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center20, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center10, alt: "Khu vực chăm sóc đặc biệt", category: "special-care" },
    { src: Center13, alt: "Khu vực tiếp đón", category: "reception" },
    { src: Center15, alt: "Hồ cá Koi", category: "pond" },
    { src: Center21, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center3, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center7, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center16, alt: "Hồ cá Koi ", category: "pond" },
    { src: Center4, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center8, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center22, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center17, alt: "Hồ cá Koi", category: "pond" },
    { src: Center23, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center5, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center11, alt: "Khu vực chăm sóc đặc biệt", category: "special-care" },
    { src: Center9, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center18, alt: "Hồ cá Koi", category: "pond" },
    { src: Center19, alt: "Hồ cá Koi", category: "pond" },
    { src: Center25, alt: "Cá bị bệnh", category: "sick-fish" },
    // { src: Center23, alt: "Cá bị bệnh", category: "sick-fish" },
  ];

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === null || prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev === null || prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "f") toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, isFullscreen]);

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
      {/* ══════════════════════════════════════════════════════════ HEADER */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-20">
        {/* Off-center luminous wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-[10%] h-[420px] w-[420px] rounded-full opacity-10 blur-[120px]"
          style={{ background: `radial-gradient(circle,${T.gold} 0%,transparent 70%)` }}
        />

        <Reveal className="relative mx-auto max-w-7xl">
          <motion.p
            variants={vFadeUp}
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: T.teal }}
          >
            Thư viện
          </motion.p>
          <motion.h1
            variants={vFadeUp}
            className="max-w-3xl text-4xl font-bold leading-[1.08] text-white lg:text-5xl"
          >
            Hình ảnh tại <span style={{ color: T.gold }}>GenKiKoi</span>
          </motion.h1>
          <motion.p
            variants={vFadeUp}
            className="mt-5 max-w-[52ch] text-base leading-7"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Khoảnh khắc thực tế tại trung tâm — từ khu điều trị, hồ cá Koi đến đội ngũ
            bác sĩ. Chọn một danh mục để xem chi tiết.
          </motion.p>

          {/* Category filter pills */}
          <motion.div variants={vFadeUp} className="mt-9 flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const active = filter === cat.value;
              return (
                <motion.button
                  key={cat.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={SP}
                  onClick={() => {
                    setFilter(cat.value);
                    setSelectedImage(null);
                  }}
                  className="rounded-full border px-5 py-2 text-sm font-bold transition-[background-color,border-color,color] duration-200"
                  style={
                    active
                      ? { backgroundColor: T.gold, borderColor: T.gold, color: T.bg0 }
                      : {
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.14)",
                          color: "rgba(255,255,255,0.75)",
                        }
                  }
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </motion.div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════ GRID */}
      <section className="relative px-6 pb-28 lg:px-20">
        <Reveal key={filter} className="mx-auto max-w-7xl" stag={0.06}>
          <motion.div
            variants={vStagger(0.06)}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${filter}-${index}`}
                variants={vScale}
                whileHover={{ scale: 1.025, zIndex: 10 }}
                transition={SP}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                style={{ background: T.bg2 }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover opacity-90 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                {/* label reveal overlay — gradient dark từ dưới, hiện khi hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(0deg,rgba(8,24,32,0.92) 0%,rgba(8,24,32,0.2) 45%,transparent 75%)",
                  }}
                />
                <p className="absolute bottom-4 left-4 right-4 translate-y-2 text-sm font-bold text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.alt}
                </p>
                <div className="absolute inset-0 rounded-2xl ring-inset ring-white/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-white/20" />
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════ LIGHTBOX */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className={`relative ${isFullscreen ? "h-full w-full" : "h-[80vmin] w-[80vmin]"} flex items-center justify-center`}
            >
              <motion.img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className={`h-full w-full object-cover ${isFullscreen ? "" : "rounded-lg"}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                className="absolute right-4 top-4 text-2xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <FaTimes />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 transform text-4xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 transform text-4xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <FaChevronRight />
              </button>
              <button
                className="absolute bottom-4 right-4 text-2xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Images;
