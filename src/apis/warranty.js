import { request } from "./_request";

export const getWarranty = async (search='') => {
    return request({
        method: "GET",
        url: "/warranty?timkiem=" + search
    });
}

export const getDetail = async (id) => {
    return request({
        method: "GET",
        url: `/warranty/${id}`
    });
}

export const updateWarranty = async (id, data) => {
    return request({
        method: "PUT",
        url: `/warranty/${id}`,
        data
    });
}

export const getAdd = async () => {
    return request({
        method: "GET",
        url: "/warranty/add"
    });
}

export const addWarranty = async (data) => {
    return request({
        method: "POST",
        url: "/warranty/store",
        data
    });
}

export const deleteWarranty = async (id) => {
    return request({
        method: "DELETE",
        url: `/warranty/${id}`
    });
}

export const filterWarranty = async (query, value, query2, value2) => {
    return request({
        method: "GET",
        url: `/warranty/filter?${query}=${value}&${query2}=${value2}`
    });
}