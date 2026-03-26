import { request } from "../request";

const toQueryString = (params = {}) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") return;
        sp.set(k, String(v));
    });
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
};

/**
 * GET /report — staff
 * Query: date | startDate+endDate | category (ObjectId, tùy chọn)
 */
export const getReport = async (params = {}) => {
    return request({
        method: "GET",
        url: `/report${toQueryString(params)}`,
    });
};

export const getReprotWeek = async () => {
    return request({
        method: "GET",
        url: `/report/week`
    });
}