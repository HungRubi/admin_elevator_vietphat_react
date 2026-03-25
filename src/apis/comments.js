import { request } from "./_request";

export const getComment = async (search='') => {
    return request({
        url: `comment/all?timkiem=${search}`,
        method: 'GET',
    });
}

export const filterComment = async (query, value, query2, value2) => {
    return request({
        url: `comment/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}