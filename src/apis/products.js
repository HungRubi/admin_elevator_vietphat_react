import { request } from "./_request";

export const getProducts = async (search='') => {
    return request({
        url: `/products/admin?timkiem=${search}`,
        method: 'get',
    });
};

export const getProductsEdit = async (id) => {
    return request({
        url: `/products/${id}`,
        method: 'get',
    });
};

export const createProduct = async (data) => {
    return request({
        url: `/products/store`,
        method: 'POST',
        data,
    });
};

export const updateProduct = async (data, id) => {
    return request({
        url: `/products/${id}`,
        method: 'PUT',
        data,
    });
};

export const deleteProduct = async (id) => {
    return request({
        url: `/products/${id}`,
        method: 'DELETE',
    });
};

export const filterProduct = async (query, value, query2, value2) => {
    return request({
        url: `/products/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}
