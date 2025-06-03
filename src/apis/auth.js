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
        if(err.response) {
            return err.response
        }
        return {
            message: "Lỗi server thử lại sau"
        }
    }
};
