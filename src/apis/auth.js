import axios from "../axios";

export const login = async (data) => {
    try {
        const response = await axios({
            url: "/auth/login/admin",
            method: "post",
            data: data,
        });
        return response;
    } catch (err) {
        if (err?.response?.status === 404) {
            try {
                const fallbackResponse = await axios({
                    url: "/auth/login",
                    method: "post",
                    data: data,
                });
                return fallbackResponse;
            } catch (fallbackErr) {
                if (fallbackErr.response) {
                    return fallbackErr.response;
                }
            }
        }
        if(err.response) {
            return err.response
        }
        return {
            message: "Lỗi server thử lại sau"
        }
    }
};

export const refreshToken = async () => {
    try {
        const response = await axios({
            url: "/auth/refresh",
            method: "post",
            withCredentials: true,
        });
        return response;
    } catch (err) {
        if (err.response) {
            return err.response;
        }
        return {
            message: "Lỗi server thử lại sau"
        };
    }
};

export const logout = async () => {
    try {
        const response = await axios({
            url: "/auth/logout",
            method: "post",
            withCredentials: true,
        });
        return response;
    } catch (err) {
        if (err.response) {
            return err.response;
        }
        return {
            message: "Lỗi server thử lại sau"
        };
    }
};
