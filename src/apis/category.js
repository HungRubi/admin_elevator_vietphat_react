import { request } from "./_request";


/** === CATEGORY PRODUCT === */
export const getCategoryProduct = async (searchTerm) => {
    return request({
        url: `/category/product?timkiem=${searchTerm}`,
        method: 'get'
    });
}

export const getCategoryProductDetail = async (id) => {
    return request({
        url: `/category/product/${id}/edit`,
        method: 'get'
    });
}

export const createCategoryProduct = async (data) => {
    return request({
        url: "/category/product/store",
        method: "post",
        data,
    });
};

export const updateCategoryProduct = async (data, id) => {
    return request({
        url: `/category/product/${id}`,
        method: "put",
        data,
    });
};

export const deleteCategoryProduct = async (id) => {
    return request({
        url: `/category/product/${id}`,
        method: "delete",
    });
};


/** === CATEGORY DISCOUNT === */
export const getCategoryDiscount = async (search='') => {
    return request({
        url: `/category/discount?timkiem=${search}`,
        method: 'get'
    });
}

export const getCategoryDiscountDetail = async (id) => {
    return request({
        url: `/category/discount/${id}`,
        method: 'get'
    });
}

export const createDiscount = async (data) => {
    return request({
        url: '/category/discount/store',
        method: 'POST',
        data
    });
}

export const deleteDiscount = async (id) => {
    return request({
        url: `/category/discount/${id}`,
        method: 'DELETE',
    });
}

export const updateDiscount = async (data, id) => {
    return request({
        url: `/category/discount/${id}`,
        method: 'PUT',
        data
    });
}

export const filterDiscount = async (query, value, query2, value2) => {
    return request({
        url: `/category/discount/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}



/** === CATEGORY BANNER === */
export const getCategoryBanner = async (search='') => {
    return request({
        url: `/category/banner?timkiem=${search}`,
        method: 'get'
    });
}

export const getCategoryBannerDetail = async (id) => {
    return request({
        url:`/category/banner/${id}`,
        method: 'get'
    });
}

export const updateBanner = async (id, data) => {
    return request({
        url:`/category/banner/${id}`,
        method: 'PUT',
        data
    });
}

export const createBanner = async (data) => {
    return request({
        url:`/category/banner/store`,
        method: 'POST',
        data
    });
}

export const filterBanner = async (query, value, query2, value2) => {
    return request({
        url:`/category/banner/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}

/** === CATEGORY VIDEO === */

export const getCategoryVideo = async (searchTerm) => {
    return request({
        url: `/category/video?timkiem=${searchTerm}`,
        method: 'get'
    });
}

export const createCategoryVideo = async (data) => {
    return request({
        url: "/category/video/store",
        method: "post",
        data,
    });
};

export const getCategoryVideoDetail = async (id) => {
    return request({
        url: `/category/video/${id}/edit`,
        method: 'get'
    });
}

export const updateCategoryVideo = async (data, id) => {
    return request({
        url: `/category/video/${id}`,
        method: "put",
        data,
    });
};

export const filterVideo = async (query, value, query2, value2) => {
    return request({
        url:`/category/video/filter?${query}=${value}&${query2}=${value2}`,
        method: 'GET',
    });
}