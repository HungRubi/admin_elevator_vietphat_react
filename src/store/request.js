import axios from "../axios";

const DEFAULT_MESSAGES = {
  network: "Mất kết nối, vui lòng thử lại.",
  timeout: "Hết thời gian chờ, vui lòng thử lại.",
  server: "Có lỗi xảy ra, vui lòng thử lại sau.",
};

const pickMessage = ({ responseData, status, error }) => {
  const msg =
    responseData?.message ||
    responseData?.data?.message ||
    responseData?.error ||
    responseData?.errors?.[0]?.message;
  if (typeof msg === "string" && msg.trim()) return msg.trim();

  if (!status) {
    const code = error?.code || "";
    const text = String(error?.message || "").toLowerCase();
    if (code === "ECONNABORTED" || text.includes("timeout")) return DEFAULT_MESSAGES.timeout;
    return DEFAULT_MESSAGES.network;
  }

  return DEFAULT_MESSAGES.server;
};

/**
 * Wrapper HTTP chuẩn cho toàn app (thay `apis/_request`).
 * Luôn trả `{ ok, status, data, message, raw }`, không throw.
 */
export async function request({ method = "GET", url, data, params, headers, withCredentials } = {}) {
  try {
    const res = await axios({
      method,
      url,
      data,
      params,
      headers,
      withCredentials,
    });

    return {
      ok: res?.status >= 200 && res?.status < 300,
      status: res?.status ?? null,
      data: res?.data ?? null,
      message: pickMessage({ responseData: res?.data, status: res?.status }),
      raw: res,
    };
  } catch (error) {
    const status = error?.response?.status ?? null;
    const responseData = error?.response?.data ?? null;

    return {
      ok: false,
      status,
      data: responseData,
      message: pickMessage({ responseData, status, error }),
      raw: error,
    };
  }
}

/**
 * Dùng trong `createAsyncThunk`: một chỗ xử lý `ok` + `message` từ `request()`.
 * @returns {T | ReturnType<rejectWithValue>}
 */
export function finishRequest(res, rejectWithValue, fallbackMessage = "Có lỗi xảy ra") {
  if (!res.ok) return rejectWithValue(res.message || fallbackMessage);
  return res.data;
}
