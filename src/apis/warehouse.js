import { request } from "./_request";

export const getWarehouse = async (search='') => {
    return request({
        method: 'GET',
        url: `/warehouse?timkiem=${search}`,
    });
}

export const deleteWarehouse = async (id) => {
    return request({
        method: 'DELETE',
        url: `/warehouse/${id}`,
    });
}

export const filterWarehouse = async (query, value, query2, value2) => {
    return request({
        method: "GET",
        url: `/warehouse/filter?${query}=${value}&${query2}=${value2}`
    });
}