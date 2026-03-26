import { request } from "../request";

/** Dashboard: chỉ admin / employee (POST /auth/login/admin). */
export const loginAdmin = async (data) => {
  return request({
    url: "/auth/login/admin",
    method: "post",
    data,
    withCredentials: true,
  });
};

/** `verifyToken` — Bearer từ axios instance. */
export const getAuthMe = async () => {
  return request({
    url: "/auth/me",
    method: "get",
  });
};

export const refreshToken = async () => {
  return request({
    url: "/auth/refresh",
    method: "post",
    withCredentials: true,
  });
};

export const logout = async () => {
  return request({
    url: "/auth/logout",
    method: "post",
    withCredentials: true,
  });
};
