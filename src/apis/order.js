import axios from "../axios";

export const getOrder = async (searchType) => {
    try{
        const response = await axios({
            url: `/order?timkiem=${searchType}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err);
    }
}
export const getOrderAdd = async () => {
    try{
        const response = await axios({
            url: '/order/add',
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err);
    }
}
export const getOrderDetail = async (id) => {
    try{
        const response = await axios({
            url: `/order/${id}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err);
    }
}

export const updateOrder = async (data, id) => {
    try{
        const response = await axios({
            url: `/order/admin/${id}`,
            method: 'PUT',
            data: data
        })
        return response
    }catch(error){
        console.log("Err call api: ", error);
    }
}

export const addOrder = async (data) => {
    try{
        const response = await axios({
            url: `/order/store`,
            method: 'POST',
            data: data
        })
        return response
    }catch(error){
        console.log("Err call api: ", error);
    }
}

export const filterOrder = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            url: `/order/filter?${query}=${value}&${query2}=${value2}`,
            method: 'GET',
        })
        return response;
    }catch(error){
        console.log("Err call api: ", error);
    }
}

export const deleteOrder = async (id) => {
    try{
        const response = await axios({
            url: `/order/${id}`,
            method: 'DELETE',
        })
        return response
    }catch(error){
        console.log("Err call api: ", error);
    }
}