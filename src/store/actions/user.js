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
        console.log(response)
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