import actionType from "./actionTypes";
import * as apis from '../../apis/products';

export const getProducts = (search='') => async (dispatch)  => {
    const result = await apis.getProducts(search);
    if(result.ok) {
        dispatch({
            type: actionType.GET_PRODUCTS,
            payload: {
                data: result.data?.data,
                search: !! search
            }
        })
        return;
    }
    dispatch({
        type: actionType.GET_PRODUCTS,
        payload: {
            data: { productFormat: [], searchProduct: [], totalPage: 1 },
            search: !!search,
            message: result.message
        }
    })
}

export const getProductsEdit = (id) => async (dispatch)  => {
    const result = await apis.getProductsEdit(id);
    if(result.ok) {
        dispatch({
            type: actionType.GET_DETAIL_PRODUCTS,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionType.GET_DETAIL_PRODUCTS,
        payload: { data: { product: {}, category: [] }, message: result.message }
    })
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
    const result = await apis.createProduct(data);
    if(result.ok) {
        dispatch({
            type: actionType.CREATE_PRODUCT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionType.CREATE_PRODUCT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const updateProduct = (data, id) => async (dispatch)  => {
    const result = await apis.updateProduct(data, id);
    if(result.ok) {
        dispatch({
            type: actionType.UPDATE_PRODUCT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionType.UPDATE_PRODUCT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteProduct = (id) => async (dispatch)  => {
    const result = await apis.deleteProduct(id);
    if(result.ok) {
        dispatch({
            type: actionType.DELETE_PRODUCT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionType.DELETE_PRODUCT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterProduct = (query, value, query2, value2) => async (dispatch)  => {
    const result = await apis.filterProduct(query, value, query2, value2);
    if(result.ok) {
        dispatch({
            type: actionType.FILTER_PRODUCT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionType.FILTER_PRODUCT_ERR,
        payload: result.data || { message: result.message }
    })
}
