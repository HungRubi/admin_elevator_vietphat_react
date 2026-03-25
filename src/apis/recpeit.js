import { request } from "./_request";

export const getReceipt = async (search='') => {
    return request({
        method: 'GET',
        url: `/receipt?timkiem=${search}`,
    });
}

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

export const filterReceipt = async (query, value, query2, value2) => {
    return request({
        method: "GET",
        url: `/receipt/filter?${query}=${value}&${query2}=${value2}`
    });
}

