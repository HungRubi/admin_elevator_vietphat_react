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

export const getProducts = async (search = "", options = {}) => {
    return request({
        url: `/products/admin${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            product: options.product, // legacy sort: product=asc/desc
        })}`,
        method: "GET",
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
        url: `/products/filter${toQueryString({
            [query]: value,
            ...(query2 ? { [query2]: value2 } : {}),
        })}`,
        method: "GET",
    });
};

// Public endpoints (không yêu cầu token)
export const getProductsPublic = async (search = "", options = {}) => {
    return request({
        url: `/products${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            product: options.product,
        })}`,
        method: "GET",
    });
};

export const filterProductsPublic = async (options = {}) => {
    return request({
        url: `/products/filter${toQueryString(options)}`,
        method: "GET",
    });
};

export const getProductFeBySlug = async (slug, options = {}) => {
    return request({
        url: `/products/fe/${slug}${toQueryString({
            limit_suggest: options.limit_suggest,
        })}`,
        method: "GET",
    });
};

export const postSelectedProducts = async (productId = []) => {
    return request({
        url: `/products/selected`,
        method: "POST",
        data: { productId },
    });
};
