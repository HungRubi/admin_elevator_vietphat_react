import axios from "../axios";

export const getCategoryProduct = async () => {
    try{
        const response = await axios({
            url: '/category/product',
            method: 'get'
        })
        console.log(response)
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}

export const getCategoryDiscount = async () => {
    try{
        const response = await axios({
            url: '/category/discount',
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}

export const getCategoryBanner = async () => {
    try{
        const response = await axios({
            url: '/category/banner',
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}