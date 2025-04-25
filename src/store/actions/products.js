import actionType from "./actionTypes";
import * as apis from '../../apis/products';

export const getProducts = (search='') => async (dispatch)  => {
    try{
        const response = await apis.getProducts(search);
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_PRODUCTS,
                payload: {
                    data: response.data?.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionType.GET_PRODUCTS,
                productData: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_PRODUCTS,
            productData: null,
            err
        })
    }
}

export const getProductsEdit = (id) => async (dispatch)  => {
    try{
        const response = await apis.getProductsEdit(id);
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_DETAIL_PRODUCTS,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_DETAIL_PRODUCTS,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_DETAIL_PRODUCTS,
            payload: null,
            err
        })
    }
}

export const addProductByOrder = (products) => async(dispatch) => {
    try{
        dispatch({
            type: actionType.ADD_PRODUCT_BY_ORDER,
            payload: products
        })
    }catch(error){
        dispatch({
            type: actionType.ADD_PRODUCT_BY_ORDER,
            payload: error
        })
    }
}

export const createProduct = (data) => async (dispatch)  => {
    try{
        const response = await apis.createProduct(data);
        if(response.status === 200) {
            dispatch({
                type: actionType.CREATE_PRODUCT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.CREATE_PRODUCT_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.CREATE_PRODUCT_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const updateProduct = (data, id) => async (dispatch)  => {
    try{
        const response = await apis.updateProduct(data, id);
        if(response.status === 200) {
            dispatch({
                type: actionType.UPDATE_PRODUCT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.UPDATE_PRODUCT_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.UPDATE_PRODUCT_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const deleteProduct = (id) => async (dispatch)  => {
    try{
        const response = await apis.deleteProduct(id);
        if(response.status === 200) {
            dispatch({
                type: actionType.DELETE_PRODUCT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.DELETE_PRODUCT_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.DELETE_PRODUCT_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const filterProduct = (query, value, query2, value2) => async (dispatch)  => {
    try{
        const response = await apis.filterProduct(query, value, query2, value2);
        if(response.status === 200) {
            dispatch({
                type: actionType.FILTER_PRODUCT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.FILTER_PRODUCT_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.FILTER_PRODUCT_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}
