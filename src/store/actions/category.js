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
export const getCategoryDiscount = () => async (dispatch) => {
    try{
        const response = await apis.getCategoryDiscount();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_DISCOUNT,
                payload: response.data,
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


/** === CATEGORY BANNER === */
export const getCategoryBanner = () => async (dispatch) => {
    try{
        const response = await apis.getCategoryBanner();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_BANNER,
                payload: response.data,
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