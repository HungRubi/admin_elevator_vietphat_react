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

/** === CATEGORY PRODUCT === */
export const getCategoryProduct = async (searchTerm = "", options = {}) => {
    return request({
        url: `/category/product${toQueryString({
            timkiem: searchTerm,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
        method: 'get'
    });
}

/** Public: breaking change → trả object { category, total, ... } */
export const getCategoryProductAll = async (options = {}) => {
    return request({
        url: `/category/product/all${toQueryString({
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
        method: "get",
    });
};

/** Public: breaking change → { category, products, total, ... } */
export const getProductsByCategorySlug = async (slug, options = {}) => {
    return request({
        url: `/category/product/${slug}${toQueryString({
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
        method: "get",
    });
};

/** Public: thêm meta cùng products */
export const getProductsByCategoryId = async (id, options = {}) => {
    return request({
        url: `/category/product/get-product/${id}${toQueryString({
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
        method: "get",
    });
};

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
export const getCategoryDiscount = async (search = "", options = {}) => {
    return request({
        url: `/category/discount${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
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

export const filterDiscount = async (query, value, query2, value2, options = {}) => {
    return request({
        url: `/category/discount/filter${toQueryString({
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
        method: 'GET',
    });
}



/** === CATEGORY BANNER === */
export const getCategoryBanner = async (search = "", options = {}) => {
    return request({
        url: `/category/banner${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
        })}`,
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

export const filterBanner = async (query, value, query2, value2, options = {}) => {
    return request({
        url:`/category/banner/filter${toQueryString({
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
        method: 'GET',
    });
}

/** === CATEGORY VIDEO === */

export const getCategoryVideo = async (searchTerm) => {
    return request({
        url: `/category/video${toQueryString({
            timkiem: searchTerm,
            page: 1,
            limit: 100,
        })}`,
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

export const filterVideo = async (query, value, query2, value2, options = {}) => {
    return request({
        url:`/category/video/filter${toQueryString({
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
        method: 'GET',
    });
}