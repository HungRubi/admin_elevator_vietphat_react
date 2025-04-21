import actionTypes from "./actionTypes";
import * as apis from '../../apis/user';

export const getUser = () => async(dispatch) => {
    try{
        const response = await apis.getUser();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_USER,
                payload: response.data
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