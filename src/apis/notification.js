import { request } from "./_request";

export const  getNotification = async (search="") => {
    return request({
        method: "GET",
        url: `/notification?timkiem=${search}`
    });
}

export const  editNotification = async (id) => {
    return request({
        method: "GET",
        url: `notification/${id}`,
    });
}

export const  addNotification = async (data) => {
    return request({
        method: "POST",
        url: `notification/add`,
        data
    });
}

export const  deleteNotification = async (id) => {
    return request({
        method: "DELETE",
        url: `notification/${id}`,
    });
}

export const filterNotification = async (paramsString) => {
    return request({
        method: "GET",
        url: `/notification/filter?${paramsString}`,
    });
}