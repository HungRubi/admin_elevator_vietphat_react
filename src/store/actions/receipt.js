import actionTypes from "./actionTypes";
import * as apis from '../../apis/recpeit';


export const getReceipt = (search='') => async (dispatch) => {
    try{
        const response = await apis.getReceipt(search);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_RECEIPT,
                payload: {
                    data: response.data,
                    search: !! search,
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_RECEIPT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_RECEIPT_ERR,
            payload: {
                message: "Lỗi server: " + error
            }
        })
    }
}

export const addReceipt = (data) => async (dispatch) => {
    try{
        const response = await apis.addReceipt(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_RECEIPT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_RECEIPT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.ADD_RECEIPT_ERR,
            payload: {
                message: "Lỗi server: " + error
            }
        })
    }
}

export const getDetailReceipt = (id) => async (dispatch) => {
    try{
        const response = await apis.getDetailReceipt(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_DETAIL_RECEIPT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_DETAIL_RECEIPT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_DETAIL_RECEIPT_ERR,
            payload: {
                message: "Lỗi server: " + error
            }
        })
    }
}

export const updateReceipt = (id, data) => async (dispatch) => {
    try{
        const response = await apis.updateReceipt(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_RECEIPT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_RECEIPT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_RECEIPT_ERR,
            payload: {
                message: "Lỗi server: " + error
            }
        })
    }
}

export const deleteReceipt = (id) => async (dispatch) => {
    try{
        const response = await apis.deleteReceipt(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_RECEIPT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_RECEIPT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.DELETE_RECEIPT_ERR,
            payload: {
                message: "Lỗi server: " + error
            }
        })
    }
}

export const filterReceipt = (query, value, query2, value2) => async (dispatch) => {{
    try{
        const response = await apis.filterReceipt(query, value, query2, value2);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_RECEIPT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_RECEIPT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.FILTER_RECEIPT_ERR,
                payload: error.response.data
            })
    }
}}