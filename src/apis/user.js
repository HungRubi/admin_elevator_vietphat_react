import { request } from './_request';

export const getUser = async (search='') => {
    return request({
        url: `/user?timkiem=${search}`,
        method: 'get'
    });
}

export const getUserDetail = async (id) => {
    return request({
        url: `/user/${id}`,
        method: 'get'
    });
}

export const createUser = async (data) => {
    return request({
        url: `/user/store`,
        method: 'POST',
        data
    });
}

export const deleleUser = async (id) => {
    return request({
        url: `/user/${id}`,
        method: 'DELETE',
    });
}

export const updateUser = async (id, data) => {
    return request({
        url: `user/update/address/${id}`,
        method: 'PUT',
        data
    });
}

export const filterUser = async (query, value, query2, value2) => {
    return request({
        url: `/user/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}

