import { request } from "./_request";

export const login = async (data) => {
    const primary = await request({
        url: "/auth/login/admin",
        method: "post",
        data,
    });

    if (primary.status === 404) {
        return request({
            url: "/auth/login",
            method: "post",
            data,
        });
    }

    return primary;
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
