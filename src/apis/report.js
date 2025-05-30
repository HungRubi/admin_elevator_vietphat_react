import axios from "../axios";

export const getReport = async (query, value, query2, value2, query3, value3) => {
    try{
        const response = await axios({
            method: "GET",
            url: `/report?${query}=${value}&${query2}=${value2}&${query3}=${value3}`
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

export const getReprotWeek = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: `/report/week`
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