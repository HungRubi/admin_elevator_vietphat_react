import actionTypes from "./actionTypes";
import * as apis from '../../apis/user';

export const getUser = (search='') => async(dispatch) => {
    const result = await apis.getUser(search);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_USER,
            payload: {
                data: result.data,
                search: !! search
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_USER,
        payload: {
            data: { user: [], searchUser: [], totalPage: 1 },
            search: !!search,
            message: result.message
        }
    })
}

export const getUserDetail = (id) => async(dispatch) => {
    const result = await apis.getUserDetail(id);
    dispatch({
        type: actionTypes.GET_DETAIL_USER,
        payload: result.ok ? result.data : { message: result.message }
    })
}

export const updateUser = (id, data) => async(dispatch) => {
    const result = await apis.updateUser(id, data);
    dispatch({
        type: actionTypes.UPDATE_USER,
        payload: result.ok ? result.data : { message: result.message }
    })
}

export const createUser = (data) => async(dispatch) => {
    const result = await apis.createUser(data);
    if(result.ok){
        dispatch({
            type: actionTypes.CREATE_USER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.CREATE_USER_ERROR,
        payload: result.data || { message: result.message }
    })
}

export const filterUser = (query, value, query2, value2) => async(dispatch) => {
    const result = await apis.filterUser(query, value, query2, value2);
    if(result.ok){
        dispatch({
            type: actionTypes.FILTER_USER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.FILTER_USER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteUser = (id) => async(dispatch) => {
    const result = await apis.deleleUser(id);
    if(result.ok){
        dispatch({
            type: actionTypes.DELETE_USER,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.DELETE_USER_ERR,
        payload: result.data || { message: result.message }
    })
}

export const setCurrrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        user,
    }
}