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

export const getOrder = async (searchType = "", options = {}) => {
    return request({
        url: `/order${toQueryString({
            timkiem: searchType,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
        method: "GET",
    });
};
export const getOrderAdd = async () => {
    return request({
        url: '/order/add',
        method: 'get'
    });
}
export const getOrderDetail = async (id) => {
    return request({
        url: `/order/${id}`,
        method: 'get'
    });
}

export const updateOrder = async (data, id) => {
    return request({
        url: `/order/admin/${id}`,
        method: 'PUT',
        data
    });
}

export const addOrder = async (data) => {
    return request({
        url: `/order/store`,
        method: 'POST',
        data
    });
}

export const filterOrder = async (query, value, query2, value2, options = {}) => {
    return request({
        url: `/order/filter${toQueryString({
            [query]: value,
            ...(query2 ? { [query2]: value2 } : {}),
            timkiem: options.timkiem,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
        method: "GET",
    });
};

export const getOrderDetails = async (id) => {
    return request({
        url: `/order/details/${id}`,
        method: "GET",
    });
};

export const deleteOrder = async (id) => {
    return request({
        url: `/order/${id}`,
        method: 'DELETE',
    });
}