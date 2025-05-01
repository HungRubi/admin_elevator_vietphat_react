import actionTypes from "./actionTypes";
import * as apis from '../../apis/category';

/** GLOBAL */
export const resetMessage = () => ({
    type: "RESET_MESSAGE",
});

/** === CATEGORY PRODUCT === */
export const getCategoryProduct = (searchTerm = '') => async (dispatch) => {
    try{
        const response = await apis.getCategoryProduct(searchTerm);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_PRODUCT,
                payload: {
                    data: response.data,
                    searchType: !!searchTerm, 
                },
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_PRODUCT,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_PRODUCT,
            payload: null,
            err
        })
    }
}

export const createCategoryProduct = (data) => async (dispatch) => {
    try {
        const response = await apis.createCategoryProduct(data);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.CREATE_CATEGORY_PRODUCT,
                payload: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_CATEGORY_PRODUCT,
                payload: response.message,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.CREATE_CATEGORY_PRODUCT,
            payload: null,
            err,
        });
    }
};

export const getCategoryProductDetail = (id) => async (dispatch) => {
    try{
        const response = await apis.getCategoryProductDetail(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_PRODUCT_DETAIL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_PRODUCT_DETAIL,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_PRODUCT_DETAIL,
            payload: null,
            err
        })
    }
}

export const updateCategoryProduct = (data, id) => async (dispatch) => {
    try {
        const response = await apis.updateCategoryProduct(data, id);
        console.log(response);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY_PRODUCT,
                payload: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY_PRODUCT,
                payload: response.message,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.UPDATE_CATEGORY_PRODUCT,
            payload: null,
            err,
        });
    }
};

export const deleteCategoryProduct = (id) => async (dispatch) => {
    try {
        const response = await apis.deleteCategoryProduct(id);
        console.log(response);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.DELETE_CATEGORY_PRODUCT,
                payload: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.DELETE_CATEGORY_PRODUCT,
                payload: response.message,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.DELETE_CATEGORY_PRODUCT,
            payload: null,
            err,
        });
    }
};


/** === CATEGORY DISCOUNT === */
export const getCategoryDiscount = (search='') => async (dispatch) => {
    try{
        const response = await apis.getCategoryDiscount(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_DISCOUNT,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_DISCOUNT,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_DISCOUNT,
            payload: null,
            err
        })
    }
}

export const getCategoryDiscountDetail = (id) => async (dispatch) => {
    try{
        const response = await apis.getCategoryDiscountDetail(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_DISCOUNT_DETAIL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_DISCOUNT_DETAIL,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_DISCOUNT_DETAIL,
            payload: null,
            err
        })
    }
}

export const createDiscount = (data) => async (dispatch) => {
    try{
        const response = await apis.createDiscount(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.CREATE_DISCOUNT,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.CREATE_DISCOUNT_ERR,
                payload: response.data,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.CREATE_DISCOUNT_ERR,
            payload: err.response.data
        })
    }
}

export const updateDiscount = (data, id) => async (dispatch) => {
    try{
        const response = await apis.updateDiscount(data, id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_DISCOUNT,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_DISCOUNT_ERR,
                payload: {
                    message: "Lỗi server vui lòng thử lại sau"
                },
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.UPDATE_DISCOUNT_ERR,
            payload: err.response.data
        })
    }
}

export const filterDiscount = (query, value, query2, value2) => async (dispatch) => {
    try{
        const response = await apis.filterDiscount(query, value, query2, value2);
        if(response.status === 200){
            dispatch({
                type: actionTypes.FILTER_DISCOUNT,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_DISCOUNT_ERR,
                payload: {
                    message: "Lỗi server vui lòng thử lại sau"
                },
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_DISCOUNT_ERR,
            payload: err.response.data
        })
    }
}


/** === CATEGORY BANNER === */
export const getCategoryBanner = (search='') => async (dispatch) => {
    try{
        const response = await apis.getCategoryBanner(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_BANNER,
                payload: {
                    data: response.data,
                    search: !! search
                },
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_BANNER,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_BANNER,
            payload: null,
            err
        })
    }
}

export const getCategoryBannerDetail = (id) => async (dispatch) => {
    try{
        const response = await apis.getCategoryBannerDetail(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_DETAIL_BANNER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_DETAIL_BANNER,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_DETAIL_BANNER,
            payload: null,
            err
        })
    }
}

export const updateBanner = (id, data) => async (dispatch) => {
    try{
        const response = await apis.updateBanner(id, data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_BANNER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_BANNER_ERR,
                payload: {
                    message: "Lỗi server vui lòng quay lại sau"
                },
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.UPDATE_BANNER_ERR,
            payload: err.response,
            err
        })
    }
}

export const createBanner = (data) => async (dispatch) => {
    try{
        const response = await apis.createBanner(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.CREATE_BANNER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.CREATE_BANNER_ERR,
                payload: {
                    message: "Lỗi server vui lòng quay lại sau"
                },
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.CREATE_BANNER_ERR,
            payload: err.response,
            err
        })
    }
}

export const filterBanner = (query, value, query2, value2) => async (dispatch) => {
    try {
        const response = await apis.filterBanner(query, value, query2, value2);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.FILTER_BANNER,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.FILTER_BANNER_ERR,
                payload: {
                    message: "Lỗi server vui lòng quay lại sau"
                },
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.FILTER_BANNER_ERR,
            payload: {
                message: "Lỗi server vui lòng quay lại sau",
                err
            }
        })
    }
};


/** === CATEGORY VIDEO */
export const getCategoryVideo = (searchTerm = '') => async (dispatch) => {
    try{
        const response = await apis.getCategoryVideo(searchTerm);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_VIDEO,
                payload: {
                    data: response.data,
                    searchType: !!searchTerm,
                },
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_VIDEO,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_VIDEO,
            payload: null,
            err
        })
    }
}

export const createCategoryVideo = (data) => async (dispatch) => {
    try {
        const response = await apis.createCategoryVideo(data);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.CREATE_CATEGORY_VIDEO,
                payload: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_CATEGORY_VIDEO,
                payload: response.message,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.CREATE_CATEGORY_VIDEO,
            payload: null,
            err,
        });
    }
};

export const getCategoryVideoDetail = (id) => async (dispatch) => {
    try{
        const response = await apis.getCategoryVideoDetail(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_VIDEO_DETAIL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_VIDEO_DETAIL,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_CATEGORY_VIDEO_DETAIL,
            payload: null,
            err
        })
    }
}

export const updateCategoryVideo = (data, id) => async (dispatch) => {
    try {
        const response = await apis.updateCategoryVideo(data, id);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY_VIDEO,
                payload: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY_VIDEO,
                payload: response.message,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.UPDATE_CATEGORY_VIDEO,
            payload: null,
            err,
        });
    }
};

export const filterVideo = (query, value, query2, value2) => async (dispatch) => {
    try {
        const response = await apis.filterVideo(query, value, query2, value2);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.FILTER_VIDEO,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.FILTER_VIDEO_ERR,
                payload: {
                    message: "Lỗi server vui lòng quay lại sau"
                },
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.FILTER_VIDEO_ERR,
            payload: {
                message: "Lỗi server vui lòng quay lại sau",
                err
            }
        })
    }
};