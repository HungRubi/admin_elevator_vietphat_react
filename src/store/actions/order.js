import actionTypes from "./actionTypes";
import * as apis from '../../apis/order';

export const getOrder = (searchType='') => async(dispatch) => {
    try{
        const response = await apis.getOrder(searchType);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_ORDER,
                payload: {
                    data: response.data,
                    searchType: !! searchType,
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_ORDER,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ORDER,
            payload: null,
            err
        })
    }
}

export const getOrderAdd = () => async(dispatch) => {
    try{
        const response = await apis.getOrderAdd();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_ADD_ORDER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ADD_ORDER,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ADD_ORDER,
            payload: null,
            err
        })
    }
}

export const getOrderDetail = (id) => async(dispatch) => {
    try{
        const response = await apis.getOrderDetail(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_ORDER_DETAIL,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ORDER_DETAIL,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ORDER_DETAIL,
            payload: null,
            err
        })
    }
}

export const updateOrder = (data, id) => async(dispatch) => {
    try{
        const response = await apis.updateOrder(id, data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_ORDER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_ORDER,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.UPDATE_ORDER,
            payload: null,
            err
        })
    }
}

export const addOrder = (data) => async(dispatch) => {
    try{
        const response = await apis.addOrder(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.ADD_ORDER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_ORDER_ERR,
                payload: response.data || { message: 'Có lỗi xảy ra' }
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.ADD_ORDER_ERR,
            payload: (error.response && error.response.data) || { message: 'Lỗi server vui lòng thử lại sau' }
        })
    }
}

export const filterOrder = (query, value, query2, value2) => async (dispatch) => {
    try{
        const response = await apis.filterOrder(query, value, query2, value2);
        if(response?.status === 200){
            dispatch({
                type: actionTypes.FILTER_ORDER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_ORDER,
                payload: response.data,
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.FILTER_ORDER,
            payload: null,
            error
        })
    }
}

export const deleteOrder = (id) => async(dispatch) => {
    try{
        const response = await apis.deleteOrder(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.DELETE_ORDER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_ORDER,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.DELETE_ORDER,
            payload: null,
            err
        })
    }
}