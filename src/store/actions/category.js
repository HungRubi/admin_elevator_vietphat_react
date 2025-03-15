import actionTypes from "./actionTypes";
import * as apis from '../../apis/category';

export const getCategoryProduct = () => async (dispatch) => {
    try{
        const response = await apis.getCategoryProduct();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_PRODUCT,
                payload: response.data,
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