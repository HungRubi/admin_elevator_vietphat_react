import axios from "../axios";

export const getReceipt = async (search='') => {
    try{
        const response = await axios({
            method: 'GET',
            url: `/receipt?timkiem=${search}`,
        })
        return response
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: 'Lỗi server vui lòng thử lại sau'
        }
    }
}

export const addReceipt = async (data) => {
    try{
        const response = await axios({
            method: 'POST',
            url: `/receipt/add`,
            data: data
        })
        return response
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: 'Lỗi server vui lòng thử lại sau'
        }
    }
}

export const getDetailReceipt = async (id) => {
    try{
        const response = await axios({
            method: 'GET',
            url: `/receipt/${id}`,
        })
        return response
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: 'Lỗi server vui lòng thử lại sau'
        }
    }
}

export const updateReceipt = async (id, data) => {
    try{
        const response = await axios({
            method: 'PUT',
            url: `/receipt/${id}`,
            data: data
        })
        return response
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: 'Lỗi server vui lòng thử lại sau'
        }
    }
}

export const deleteReceipt = async (id) => {
    try{
        const response = await axios({
            method: 'DELETE',
            url: `/receipt/${id}`,
        })
        return response
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: 'Lỗi server vui lòng thử lại sau'
        }
    }
}

export const filterReceipt = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            method: "GET",
            url: `/receipt/filter?${query}=${value}&${query2}=${value2}`
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

