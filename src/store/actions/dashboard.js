import actionTypes from "./actionTypes";
import * as apis from "../../apis/dashboard";

export const getTotalOrderLastWeek = () => async (dispatch) => {
    const result = await apis.getTotalOrderLastWeek();
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_TOTAL_WEEK,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_TOTAL_WEEK_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getNewUser = () => async(dispatch) => {
    const result = await apis.getNewUser();
    if(result.ok){
        dispatch({
            type: actionTypes.GET_NEW_USER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_NEW_USER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getOrderDiscount = () => async(dispatch) => {
    const result = await apis.getOrderDiscount();
    if(result.ok){
        dispatch({
            type: actionTypes.GET_ORDER_DISCOUNT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ORDER_DISCOUNT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getOrderPayment = () => async(dispatch) => {
    const result = await apis.getOrderPayment();
    if(result.ok){
        dispatch({
            type: actionTypes.GET_ORDER_PAYMENT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ORDER_PAYMENT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getMonthlyRevenue = () => async(dispatch) => {
    const result = await apis.getMonthlyRevenue();
    if(result.ok){
        dispatch({
            type: actionTypes.GET_MONTH_REVENUE,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_MONTH_REVENUE_ERR,
        payload: result.data || { message: result.message }
    })
}