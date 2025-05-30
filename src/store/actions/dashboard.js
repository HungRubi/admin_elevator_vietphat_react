import actionTypes from "./actionTypes";
import * as apis from "../../apis/dashboard";

export const getTotalOrderLastWeek = () => async (dispatch) => {
    try{
        const response = await apis.getTotalOrderLastWeek();
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_TOTAL_WEEK,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOTAL_WEEK_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_TOTAL_WEEK_ERR,
            payload: error.response
        })
    }
}

export const getNewUser = () => async(dispatch) => {
    try{
        const response = await apis.getNewUser();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_NEW_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_NEW_USER_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_NEW_USER_ERR,
            payload: err.response.data
        })
    }
}

export const getOrderDiscount = () => async(dispatch) => {
    try{
        const response = await apis.getOrderDiscount();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_ORDER_DISCOUNT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ORDER_DISCOUNT_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ORDER_DISCOUNT_ERR,
            payload: err.response.data
        })
    }
}

export const getOrderPayment = () => async(dispatch) => {
    try{
        const response = await apis.getOrderPayment();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_ORDER_PAYMENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ORDER_PAYMENT_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ORDER_PAYMENT_ERR,
            payload: err.response.data
        })
    }
}

export const getMonthlyRevenue = () => async(dispatch) => {
    try{
        const response = await apis.getMonthlyRevenue();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_MONTH_REVENUE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_MONTH_REVENUE_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_MONTH_REVENUE_ERR,
            payload: err.response.data
        })
    }
}