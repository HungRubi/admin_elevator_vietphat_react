import actionTypes from "./actionTypes";
import * as apis from '../../apis/order';

export const getOrder = () => async(dispatch) => {
    try{
        const response = await apis.getOrder();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_ORDER,
                payload: response.data
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