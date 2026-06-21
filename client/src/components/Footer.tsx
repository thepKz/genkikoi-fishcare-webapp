import { Call, Clock, Location, Sms } from "iconsax-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const C = {
  bg: "#081820",
  surface: "#0D2430",
  gold: "#F3D7A6",
  goldD: "#D99A3D",
  teal: "#1D8A76",
  line: "rgba(255,255,255,0.08)",
  text: "rgba(255,255,255,0.6)",
  textDim: "rgba(255,255,255,0.4)",
} as const;

const aboutLinks = [
  { to: "/about-us", label: "Giới thiệu" },
  { to: "/images", label: "Hình ảnh hoạt động" },
  { to: "/faq", label: "Hỏi đáp" },
  { to: "/doctors", label: "Bác sĩ" },
  { to: "/terms-of-service", label: "Điều khoản dịch vụ" },
];

const serviceLinks = [
  { to: "/services/consulting-treatment", label: "Tư vấn & Điều trị" },
  { to: "/services/vaccine", label: "Tiêm ngừa" },
  { to: "/services/water-quality", label: "Kiểm tra chất lượng nước" },
  { to: "/services/service-price-table", label: "Bảng giá dịch vụ" },
];

const contactInfo = [
  { Icon: Call, label: "0888 500 703" },
  { Icon: Sms, label: "lienhe@genkikoi.dev" },
  { Icon: Location, label: "Quận 9, TP. Hồ Chí Minh" },
  { Icon: Clock, label: "08:00 – 20:00, T2 – CN" },
];

const Footer = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;
    const lat = 10.8411;
    const lon = 106.809;
    const map = L.map("map", { zoomControl: false, attributionControl: false }).setView([lat, lon], 15);
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "",
    }).addTo(map);

    const icon = L.icon({
      iconUrl: Logo,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34],
      className: "rounded-full",
    });
    L.marker([lat, lon], { icon }).addTo(map).bindPopup("GenKiKoi").openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const LinkCol = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
    <div>
      <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.gold }}>
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="group inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: C.text }}
            >
              <span className="h-px w-0 transition-[width] duration-200 group-hover:w-3" style={{ background: C.goldD }} />
              <span className="group-hover:text-white">{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="relative z-20" style={{ background: C.bg }}>
      {/* Top divider glow */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,${C.goldD}55,transparent)` }} />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          {/* Brand + contact */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img src={Logo} alt="GenKiKoi" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: C.textDim }}>
                  Phòng khám Thú Y
                </p>
                <p className="text-xl font-bold text-white">GenKiKoi</p>
              </div>
            </div>
            <p className="mb-6 max-w-[32ch] text-sm leading-6" style={{ color: C.text }}>
              Chuyên chăm sóc, điều trị và phục hồi cá Koi với đội ngũ bác sĩ tận tâm.
            </p>
            <ul className="space-y-3">
              {contactInfo.map((c) => (
                <li key={c.label} className="flex items-center gap-3 text-sm" style={{ color: C.text }}>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(243,215,166,0.12)" }}
                  >
                    <c.Icon size={16} variant="Bold" color={C.gold} />
                  </span>
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <LinkCol title="Về phòng khám" links={aboutLinks} />
          <LinkCol title="Dịch vụ" links={serviceLinks} />

          {/* Map */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.gold }}>
              <Location size={15} variant="Bold" color={C.gold} /> Bản đồ
            </h3>
            <div
              id="map"
              className="mb-3 h-52 w-full overflow-hidden rounded-2xl border"
              style={{ borderColor: C.line }}
            />
            <button
              onClick={() =>
                window.open(`https://www.google.com/maps/search/?api=1&query=FPT+University+Ho+Chi+Minh+City`, "_blank")
              }
              className="w-full rounded-full border py-2.5 text-sm font-bold transition-colors duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.18)", color: "#fff" }}
            >
              Xem bản đồ lớn
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: C.line }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-center text-xs lg:flex-row lg:px-20 lg:text-left" style={{ color: C.textDim }}>
          <p>© 2026 Phòng khám Thú Y GenKiKoi. Tất cả các quyền được bảo lưu.</p>
          <p>
            Thiết kế với <span style={{ color: C.teal }}>♥</span> cho người yêu cá Koi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
