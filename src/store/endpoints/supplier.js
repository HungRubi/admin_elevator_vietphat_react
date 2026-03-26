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

export const getSuppliers = async (search = "", options = {}) => {
    return request({
        method: "GET",
        url: `/supplier${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            supplier: options.supplier, // legacy sort: supplier=asc/desc
        })}`,
    });
};

export const addSupplier = async (data) => {
    return request({
        method: "POST",
        url: "/supplier/add",
        data,
    });
}

export const getDetails = async (id) => {
    return request({
        method: "GET",
        url: `/supplier/edit/${id}`,
    });
}

export const update = async (data ,id) => {
    return request({
        method: "PUT",
        url: `/supplier/update/${id}`,   
        data, 
    });
}

export const deleteSupplier = async (id) => {
    return request({
        method: "DELETE",
        url: `/supplier/delete/${id}`,   
    });
}

export const getProductBySupplier = async (id, options = {}) => {
    return request({
        method: "GET",
        url: `/supplier/product/${id}${toQueryString({
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            timkiem: options.timkiem,
            q: options.q,
        })}`,
    });
};
