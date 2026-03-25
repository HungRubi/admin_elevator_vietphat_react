import actionTypes from "./actionTypes";
import * as apis from '../../apis/recpeit';


export const getReceipt = (search='') => async (dispatch) => {
    const result = await apis.getReceipt(search);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_RECEIPT,
            payload: {
                data: result.data,
                search: !! search,
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_RECEIPT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const addReceipt = (data) => async (dispatch) => {
    const result = await apis.addReceipt(data);
    if(result.ok) {
        dispatch({
            type: actionTypes.ADD_RECEIPT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.ADD_RECEIPT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getDetailReceipt = (id) => async (dispatch) => {
    const result = await apis.getDetailReceipt(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_DETAIL_RECEIPT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_DETAIL_RECEIPT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const updateReceipt = (id, data) => async (dispatch) => {
    const result = await apis.updateReceipt(id, data);
    if(result.ok) {
        dispatch({
            type: actionTypes.UPDATE_RECEIPT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.UPDATE_RECEIPT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteReceipt = (id) => async (dispatch) => {
    const result = await apis.deleteReceipt(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.DELETE_RECEIPT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.DELETE_RECEIPT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterReceipt = (query, value, query2, value2) => async (dispatch) => {
    const result = await apis.filterReceipt(query, value, query2, value2);
    if(result.ok) {
        dispatch({
            type: actionTypes.FILTER_RECEIPT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.FILTER_RECEIPT_ERR,
        payload: result.data || { message: result.message }
    })
}