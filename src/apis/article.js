import { request } from "./_request";

export const getArticle = async (search) => {
    return request({
        url: `/articles/admin?timkiem=${search}`,
        method: 'get'
    });
}

export const getArticleDetail = async (id) => {
    return request({
        url: `/articles/${id}`,
        method: 'get'
    });
}

export const createArticle = async (data) => {
    return request({
        url: `/articles/store`,
        method: 'POST',
        data
    });
}

export const deleteArticle = async (id) => {
    return request({
        url: `/articles/${id}`,
        method: 'DELETE',
    });
}

export const updateArticle = async (id, data) => {
    return request({
        url: `/articles/${id}`,
        method: 'PUT',
        data
    });
}

export const filterArticle = async (query, value, query2, value2) => {
    return request({
        url: `/articles/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}