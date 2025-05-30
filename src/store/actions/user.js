import actionTypes from "./actionTypes";
import * as apis from '../../apis/user';

export const getUser = (search='') => async(dispatch) => {
    try{
        const response = await apis.getUser(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_USER,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_USER,
                payload: []
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_USER,
            payload: [],
            err
        })
    }
}

export const getUserDetail = (id) => async(dispatch) => {
    try{
        const response = await apis.getUserDetail(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_DETAIL_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_DETAIL_USER,
                payload: []
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_DETAIL_USER,
            payload: [],
            err
        })
    }
}

export const updateUser = (id, data) => async(dispatch) => {
    try{
        const response = await apis.updateUser(id, data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_USER,
                payload: []
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.UPDATE_USER,
            payload: [],
            err
        })
    }
}

export const createUser = (data) => async(dispatch) => {
    try{
        const response = await apis.createUser(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.CREATE_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.CREATE_USER_ERROR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.CREATE_USER_ERROR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const filterUser = (query, value, query2, value2) => async(dispatch) => {
    try{
        const response = await apis.filterUser(query, value, query2, value2);
        if(response.status === 200){
            dispatch({
                type: actionTypes.FILTER_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_USER_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_USER_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const deleteUser = (id) => async(dispatch) => {
    try{
        const response = await apis.deleleUser(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.DELETE_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_PRODUCT_ERR,
                payload: {
                    message: "Lỗi server vui lòng thử lại sau"
                }
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.DELETE_PRODUCT_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

