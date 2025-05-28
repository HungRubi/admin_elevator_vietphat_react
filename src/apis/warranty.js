import axios from "../axios";

export const getWarranty = async (search='') => {
    try{
        const response = await axios({
            method: "GET",
            url: "/warranty?timkiem=" + search
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const getDetail = async (id) => {
    try{
        const response = await axios({
            method: "GET",
            url: `/warranty/${id}`
        })
        console.log(response);
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const updateWarranty = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/warranty/${id}`,
            data: data
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const getAdd = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/warranty/add"
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const addWarranty = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/warranty/store",
            data: data
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const deleteWarranty = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/warranty/${id}`
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const filterWarranty = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            method: "GET",
            url: `/warranty/filter?${query}=${value}&${query2}=${value2}`
        })
        console.log(response)
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}