import actionTypes from "./actionTypes";
import * as apis from '../../apis/order';

export const getOrder = (searchType='') => async(dispatch) => {
    const result = await apis.getOrder(searchType);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_ORDER,
            payload: {
                data: result.data,
                searchType: !! searchType,
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ORDER,
        payload: {
            data: { orderFormat: [], searchOrder: [], totalPage: 1 },
            searchType: !!searchType,
            message: result.message
        }
    })
}

export const getOrderAdd = () => async(dispatch) => {
    const result = await apis.getOrderAdd();
    if(result.ok){
        dispatch({
            type: actionTypes.GET_ADD_ORDER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ADD_ORDER,
        payload: result.data || { message: result.message }
    })
}

export const getOrderDetail = (id) => async(dispatch) => {
    const result = await apis.getOrderDetail(id);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_ORDER_DETAIL,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ORDER_DETAIL,
        payload: result.data || { message: result.message }
    })
}

export const updateOrder = (data, id) => async(dispatch) => {
    const result = await apis.updateOrder(data, id);
    if(result.ok){
        dispatch({
            type: actionTypes.UPDATE_ORDER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.UPDATE_ORDER,
        payload: result.data || { message: result.message }
    })
}

export const addOrder = (data) => async(dispatch) => {
    const result = await apis.addOrder(data);
    if(result.ok){
        dispatch({
            type: actionTypes.ADD_ORDER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.ADD_ORDER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterOrder = (query, value, query2, value2) => async (dispatch) => {
    const result = await apis.filterOrder(query, value, query2, value2);
    dispatch({
        type: actionTypes.FILTER_ORDER,
        payload: result.data,
        error: result.ok ? null : result.message
    })
}

export const deleteOrder = (id) => async(dispatch) => {
    const result = await apis.deleteOrder(id);
    dispatch({
        type: actionTypes.DELETE_ORDER,
        payload: result.ok ? result.data : null,
        error: result.ok ? null : result.message
    })
}