import { request } from "./_request";

export const getTotalOrderLastWeek = async () => {
    return request({
        method: "GET",
        url: `/order/api/count`
    });
}

export const getNewUser = async () => {
    return request({
        method: "GET",
        url: "/user/new",
    });
}

export const getOrderDiscount = async () => {
    return request({
        method: "GET",
        url: "/order/discount-chart",
    });
}

export const getOrderPayment = async () => {
    return request({
        method: "GET",
        url: "/order/payment-chart",
    });
}

export const getMonthlyRevenue = async () => {
    return request({
        method: "GET",
        url: "/order/monthly-chart",
    });
}