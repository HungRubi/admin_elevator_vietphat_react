import axios from "../axios";

export const getTotalOrderLastWeek = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: `/order/api/count`
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

export const getNewUser = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/user/new",
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

export const getOrderDiscount = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/order/discount-chart",
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

export const getOrderPayment = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/order/payment-chart",
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

export const getMonthlyRevenue = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/order/monthly-chart",
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