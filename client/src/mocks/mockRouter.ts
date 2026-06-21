// Mock router cho chế độ FE-only.
// Khớp url của handleAPI với một handler trả về dữ liệu giả.
// Các trang đọc kết quả dạng `res.data`, nên handler trả { data, message }.

import {
  mockDoctors,
  mockFeedbacks,
  mockProfile,
  mockServices,
} from "./mockData";

type Method = "POST" | "PUT" | "GET" | "DELETE" | "PATCH";

interface MockContext {
  url: string;
  method: Method;
  data?: any;
  params?: any;
}

type MockHandler = (ctx: MockContext) => any;

interface MockRoute {
  test: (url: string, method: Method) => boolean;
  handle: MockHandler;
}

// Bỏ tiền tố /api và query string để khớp cho gọn.
const normalize = (url: string) =>
  url.replace(/^\/?api\//, "/").replace(/\?.*$/, "").replace(/\/+$/, "") || "/";

const ok = (data: any, message = "Thành công (demo)") => ({ data, message });

const routes: MockRoute[] = [
  // ---- Feedbacks ----
  {
    test: (u) => /\/feedbacks\/public$/.test(u),
    handle: () => ok(mockFeedbacks),
  },
  {
    test: (u, m) => /\/feedbacks$/.test(u) && m === "POST",
    handle: () => ok(null, "Cảm ơn bạn đã gửi đánh giá (demo)"),
  },

  // ---- Services ----
  {
    test: (u) => /\/services$/.test(u),
    handle: () => ok(mockServices),
  },

  // ---- Doctors ----
  {
    test: (u) => /\/doctors\/all$/.test(u),
    handle: () => ok(mockDoctors),
  },
  {
    test: (u) => /\/doctors\/[^/]+$/.test(u) && !/\/doctors\/all$/.test(u),
    handle: () => ok(mockDoctors[0]),
  },
  {
    test: (u) => /\/doctors$/.test(u),
    handle: () => ok(mockDoctors),
  },

  // ---- Users / Auth ----
  {
    test: (u) => /\/(users|auth)\/check-/.test(u),
    handle: () => ok({ isExist: false }, "Hợp lệ (demo)"),
  },
  {
    test: (u) => /\/users$/.test(u),
    handle: () => ok(mockProfile),
  },
  {
    test: (u) => /\/auth\/(login|register|login-google)$/.test(u),
    handle: () =>
      ok(
        {
          ...mockProfile,
          token: "demo-token",
        },
        "Đăng nhập demo thành công",
      ),
  },

  // ---- Catch-all an toàn (collection vs item) ----
];

// Heuristic mặc định: nếu url kết thúc bằng id -> trả object, ngược lại trả mảng rỗng.
const fallback: MockHandler = ({ url }) => {
  const n = normalize(url);
  const looksLikeItem = /\/[a-f0-9]{6,}$/i.test(n) || /\/[^/]+\/[^/]+$/.test(n);
  return ok(looksLikeItem ? {} : [], "Chế độ demo - không có dữ liệu");
};

export function resolveMock(ctx: MockContext) {
  const n = normalize(ctx.url);
  const route = routes.find((r) => r.test(n, ctx.method));
  if (route) return route.handle({ ...ctx, url: n });
  return fallback(ctx);
}
