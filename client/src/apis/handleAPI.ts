import axiosInstance from "./axiosInstance";
import { resolveMock } from "../mocks/mockRouter";

// FE-only mode: backend đã ngừng hoạt động. Mặc định BẬT mock.
// Đặt VITE_FE_ONLY=false trong .env nếu muốn gọi backend thật trở lại.
const FE_ONLY = import.meta.env.VITE_FE_ONLY !== "false";

export const handleAPI = async (
  url: string,
  data?: any,
  method?: "POST" | "PUT" | "GET" | "DELETE" | "PATCH",
  params?: any,
) => {
  const resolvedMethod = method ?? "GET";

  if (FE_ONLY) {
    // Giả lập độ trễ mạng nhẹ để loading state vẫn mượt, rồi trả mock.
    await new Promise((r) => setTimeout(r, 250));
    return resolveMock({ url, method: resolvedMethod, data, params });
  }

  return await axiosInstance(url, {
    method: resolvedMethod,
    data,
    params,
  });
};
