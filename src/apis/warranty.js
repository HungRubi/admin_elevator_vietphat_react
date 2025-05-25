import axios from "../axios";

export const getAdd = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/warranty/add"
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}