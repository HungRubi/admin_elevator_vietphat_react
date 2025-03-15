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

export const getCategoryProductDetail = async (id) => {
    try{
        const response = await axios({
            url: `/category/product/${id}`,
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

export const getCategoryDiscountDetail = async (id) => {
    try{
        const response = await axios({
            url: `/category/discount/${id}`,
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

export const getCategoryBannerDetail = async (id) => {
    try{
        const response = await axios({
            url:`/category/banner/${id}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}