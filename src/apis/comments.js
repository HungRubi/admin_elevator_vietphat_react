import axios from "../axios";

export const getComment = async (search='') => {
    try{
        const response = await axios({
            url: `comment/all?timkiem=${search}`,
            method: 'GET',
        })
        return response;
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            payload: {
                message: "Lỗi server xin thử lại sau :(("
            }
        }
    }
}

export const filterComment = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            url: `comment/filter?${query}=${value}&${query2}=${value2}`,
            method: 'GET',
        })
        console.log(response)
        return response;
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            payload: {
                message: "Lỗi server xin thử lại sau :(("
            }
        }
    }
}