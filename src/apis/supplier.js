import { request } from "./_request";

export const getSuppliers = async (search='') => {
    return request({
        method: "GET",
        url: `/supplier?timkiem=${search}`,
    });
}

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

export const getProductBySupplier = async (id) => {
    return request({
        method: "GET",
        url: `/supplier/product/${id}`,   
    });
}
