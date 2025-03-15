import axios from "../axios";

export const getOrder = async () => {
    try{
        const response = await axios({
            url: '/order',
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
            url: '/orders/add',
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
            url: `/orders/${id}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err);
    }
}