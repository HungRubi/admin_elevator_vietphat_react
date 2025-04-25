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
        return response;
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
    }
};


/** === CATEGORY DISCOUNT === */
export const getCategoryDiscount = async (search='') => {
    try{
        const response = await axios({
            url: `/category/discount?timkiem=${search}`,
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

export const createDiscount = async (data) => {
    try{
        const response = await axios({
            url: '/category/discount/store',
            method: 'POST',
            data: data
        })
        return response;
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const updateDiscount = async (data, id) => {
    try{
        const response = await axios({
            url: `/category/discount/${id}`,
            method: 'PUT',
            data: data
        })
        return response;
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const filterDiscount = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            url: `/category/discount/filter?${query}=${value}&${query2}=${value2}`,
            method: 'GET',
        })
        return response;
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
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

export const updateBanner = async (id, data) => {
    try{
        const response = await axios({
            url:`/category/banner/${id}`,
            method: 'PUT',
            data: data
        })
        return response
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const createBanner = async (data) => {
    try{
        const response = await axios({
            url:`/category/banner/store`,
            method: 'POST',
            data: data
        })
        return response
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
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