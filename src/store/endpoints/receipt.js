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

export const getReceipt = async (search = "", options = {}) => {
    return request({
        method: "GET",
        url: `/receipt${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            receipt: options.receipt, // legacy: receipt=asc/desc
        })}`,
    });
};

export const addReceipt = async (data) => {
    return request({
        method: 'POST',
        url: `/receipt/add`,
        data
    });
}

export const getDetailReceipt = async (id) => {
    return request({
        method: 'GET',
        url: `/receipt/${id}`,
    });
}

export const updateReceipt = async (id, data) => {
    return request({
        method: 'PUT',
        url: `/receipt/${id}`,
        data
    });
}

export const deleteReceipt = async (id) => {
    return request({
        method: 'DELETE',
        url: `/receipt/${id}`,
    });
}

export const filterReceipt = async (query, value, query2, value2, extra = {}) => {
    return request({
        method: "GET",
        url: `/receipt/filter${toQueryString({
            [query]: value,
            ...(query2 ? { [query2]: value2 } : {}),
            timkiem: extra.timkiem,
            q: extra.q,
            page: extra.page,
            offset: extra.offset,
            limit: extra.limit,
            sort: extra.sort,
            order: extra.order,
            receipt: extra.receipt,
        })}`,
    });
};

