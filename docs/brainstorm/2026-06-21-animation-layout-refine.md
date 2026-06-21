# Brainstorm: Animation + Layout Refine — GenKiKoi Home

**Date:** 2026-06-21  
**Status:** agreed → implement immediately

## Problem statement
- **Giật scroll:** GSAP ScrollTrigger + framer `AnimatedSection` (useInView) race trên cùng elements. `filter:blur()` animate → GPU choke.
- **Hero giật:** `position:fixed` background không composite riêng khi có transform con.
- **Hover card giật:** framer `whileHover` + Tailwind `hover:translate` double-animate transform. `transition-all` animate mọi property không cần thiết.
- **Button hover màu sai:** antd 6 CSS-in-JS override Tailwind hover.
- **Thừa chữ / layout không ổn:** badge + heading + subtitle 3 lớp mỗi section; description dài; 3 ảnh stack dọc hero.

## Decisions

### Animation
- **GSAP only for scroll reveals:** bỏ AnimatedSection (framer useInView) ở mọi nơi GSAP đã cover. Tránh 2 engine race.
- **BỎ filter:blur()** hoàn toàn → chỉ `opacity + y`. GPU-friendly, 60fps.
- **Framer chỉ làm hover + micro-interaction** (whileHover, whileTap).
- Fixed background → thêm `will-change: transform` trên img để composite riêng.
- `transition-all` → `transition-[transform,opacity,shadow]` cụ thể.
- Không double-animate: nếu framer whileHover thì không có Tailwind hover:translate trên cùng element.

### Button hover
- Dùng `!` prefix (Tailwind important) hoặc `style={{ color: '...' }}` để thắng antd 6 CSS-in-JS.
- Antd 6 ghost button: đặt colorPrimary token hoặc dùng custom className với specificity cao hơn.

### Layout (gọp mạnh tay)
- Hero: bỏ 3 ảnh stack dọc → 1 ảnh lớn right-side, text ngắn gọn.
- Services: bỏ description dài trong list → title + icon only.
- Gallery: thêm ảnh local (có sẵn center/water-quality), masonry pattern.
- Feedback: carousel → static 3-col grid (không autoplay, không jank).
- Expected: compact, bỏ subtitle dài.
- Mỗi section: badge OR subtitle, không cả hai.

## Risks
- Bỏ AnimatedSection có thể làm một số trang khác (không dùng GSAP) mất reveal — giữ AnimatedSection cho các trang khác, chỉ bỏ khỏi Home.
- antd 6 CSS-in-JS specificity: test sau khi apply.

## Success criteria
- Scroll mượt 60fps (no blur animation, no double-engine).
- Hero không giật khi scroll.
- Hover button đúng màu tông.
- Home trông clean hơn, ít chữ hơn, mỗi section 1 message rõ.
