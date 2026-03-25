import { request } from "./_request";

export const getReport = async (query, value, query2, value2, query3, value3) => {
    return request({
        method: "GET",
        url: `/report?${query}=${value}&${query2}=${value2}&${query3}=${value3}`
    });
}

export const getReprotWeek = async () => {
    return request({
        method: "GET",
        url: `/report/week`
    });
}