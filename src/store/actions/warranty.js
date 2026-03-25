import actionTypes from "./actionTypes";
import * as apis from "../../apis/warranty";

export const getWarranty = (search='') => async (dispatch) => {
    const result = await apis.getWarranty(search);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_WARRANTY,
            payload: {
                data: result.data,
                search: !! search
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getDetail = (id) => async (dispatch) => {
    const result = await apis.getDetail(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_DETAIL_WARRANTY,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_DETAIL_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}

export const updateWarranty = (id, data) => async (dispatch) => {
    const result = await apis.updateWarranty(id, data);
    if(result.ok) {
        dispatch({
            type: actionTypes.UPDATE_WARRANTY,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.UPDATE_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getAdd = () => async (dispatch) => {
    const result = await apis.getAdd();
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_ADD_WARRANTY,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ADD_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}

export const addWarranty = (data) => async (dispatch) => {
    const result = await apis.addWarranty(data);
    if(result.ok) {
        dispatch({
            type: actionTypes.ADD_WARRANTY,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.ADD_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteWarranty = (id) => async (dispatch) => {
    const result = await apis.deleteWarranty(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.DELETE_WARRANTY,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.DELETE_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterWarranty = (query, value, query2, value2) => async (dispatch) => {
    const result = await apis.filterWarranty(query, value, query2, value2);
    if(result.ok) {
        dispatch({
            type: actionTypes.FILTER_WARRANTY,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.FILTER_WARRANTY_ERR,
        payload: result.data || { message: result.message }
    })
}