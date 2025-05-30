import axios from "../axios";

export const getWarehouse = async (search='') => {
    try{
        const response = await axios({
            method: 'GET',
            url: `/warehouse?timkiem=${search}`,
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: 'Internal Server Error',
        }
    }
}

export const deleteWarehouse = async (id) => {
    try{
        const response = await axios({
            method: 'DELETE',
            url: `/warehouse/${id}`,
        })
        return response;
    }catch(error) {
       if(error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: 'Internal Server Error',
        } 
    }
}

export const filterWarehouse = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            method: "GET",
            url: `/warehouse/filter?${query}=${value}&${query2}=${value2}`
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