import { request } from "../request";

export const getTotalOrderLastWeek = async () => {
    return request({
        method: "GET",
        url: `/order/api/count`
    });
}

/** GET /user/new — days mặc định 7, clamp 1–90 */
export const getNewUser = async (days = 7) => {
    const d = Math.min(90, Math.max(1, Number(days) || 7));
    return request({
        method: "GET",
        url: `/user/new?days=${d}`,
    });
};

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