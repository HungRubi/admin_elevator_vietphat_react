import axios from "../axios";


/** === CATEGORY PRODUCT === */
export const getCategoryProduct = async (searchTerm) => {
    try{
        const response = await axios({
            url: `/category/product?timkiem=${searchTerm}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}

export const getCategoryProductDetail = async (id) => {
    try{
        const response = await axios({
            url: `/category/product/${id}/edit`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}

export const createCategoryProduct = async (data) => {
    try {
        const response = await axios({
            url: "/category/product/store",
            method: "post",
            data: data,
        });
        return response;
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
    }
};

export const updateCategoryProduct = async (data, id) => {
    try {
        const response = await axios({
            url: `/category/product/${id}`,
            method: "put",
            data: data,
        });
        return response;
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
    }
};

export const deleteCategoryProduct = async (id) => {
    try {
        const response = await axios({
            url: `/category/product/${id}`,
            method: "delete",
        });
        console.log(response)
        return response;
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
    }
};

/** === CATEGORY DISCOUNT === */
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


/** === CATEGORY BANNER === */
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

/** === CATEGORY VIDEO === */

export const getCategoryVideo = async (searchTerm) => {
    try{
        const response = await axios({
            url: `/category/video?timkiem=${searchTerm}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}

export const createCategoryVideo = async (data) => {
    try {
        const response = await axios({
            url: "/category/video/store",
            method: "post",
            data: data,
        });
        return response;
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
    }
};

export const getCategoryVideoDetail = async (id) => {
    try{
        const response = await axios({
            url: `/category/video/${id}/edit`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err)
    }
}

export const updateCategoryVideo = async (data, id) => {
    try {
        const response = await axios({
            url: `/category/video/${id}`,
            method: "put",
            data: data,
        });
        return response;
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
    }
};