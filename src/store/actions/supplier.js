import actionTypes from "./actionTypes";
import * as apis from '../../apis/supplier';

export const getSuppliers = (search='') => async (dispatch) => {
    const result = await apis.getSuppliers(search);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_SUPPLIER,
            payload: {
                data: result.data,
                search: !! search
            },
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_SUPPLIER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const addSupplier = (data) => async (dispatch) => {
    const result = await apis.addSupplier(data);
    if(result.ok){
        dispatch({
            type: actionTypes.ADD_SUPPLIER,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.ADD_SUPPLIER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getDetails = (id) => async (dispatch) => {
    const result = await apis.getDetails(id);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_DETAIL_SUPPLIER,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_DETAIL_SUPPLIER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const update = (id, data) => async (dispatch) => {
    const result = await apis.update(data, id);
    if(result.ok){
        dispatch({
            type: actionTypes.UPDATE_SUPPLIER,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.UPDATE_SUPPLIER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteSupplier = (id) => async (dispatch) => {
    const result = await apis.deleteSupplier(id);
    if(result.ok){
        dispatch({
            type: actionTypes.DELETE_SUPPLIER,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.DELETE_SUPPLIER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getProductBySupplier = (id) => async (dispatch) => {
    const result = await apis.getProductBySupplier(id);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_PRODUCT_BY_SUPPLIER,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_PRODUCT_BY_SUPPLIER_ERR,
        payload: result.data || { message: result.message }
    })
}