import { request } from "./_request";

export const getOrder = async (searchType) => {
    return request({
        url: `/order?timkiem=${searchType}`,
        method: 'get'
    });
}
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

export const filterOrder = async (query, value, query2, value2) => {
    return request({
        url: `/order/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}

export const deleteOrder = async (id) => {
    return request({
        url: `/order/${id}`,
        method: 'DELETE',
    });
}