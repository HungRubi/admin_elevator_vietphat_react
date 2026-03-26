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

export const getNotification = async (search = "", options = {}) => {
    return request({
        method: "GET",
        url: `/notification${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            notification: options.notification, // legacy sort: notification=asc/desc
        })}`,
    });
};

export const  editNotification = async (id) => {
    return request({
        method: "GET",
        url: `notification/${id}`,
    });
}

export const  addNotification = async (data) => {
    return request({
        method: "POST",
        url: `notification/add`,
        data
    });
}

export const  deleteNotification = async (id) => {
    return request({
        method: "DELETE",
        url: `notification/${id}`,
    });
}

export const filterNotification = async (paramsStringOrObject) => {
    const url =
        typeof paramsStringOrObject === "string"
            ? `/notification/filter?${paramsStringOrObject}`
            : `/notification/filter${toQueryString(paramsStringOrObject || {})}`;
    return request({
        method: "GET",
        url,
    });
};