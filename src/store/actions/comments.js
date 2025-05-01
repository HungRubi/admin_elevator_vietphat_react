import actionTypes from "./actionTypes";
import * as apis from '../../apis/comments';

export const getComment = (search='') => async (dispatch) => {
    try{
        const response = await apis.getComment(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_COMMENT,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_COMMENT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_COMMENT_ERR,
            payload: error.response
        })
    }
}

export const filterComment = (query, value, query2, value2) => async (dispatch) => {
    try{
        const response = await apis.filterComment(query, value, query2, value2);
        if(response.status === 200){
            dispatch({
                type: actionTypes.FILTER_COMMENT,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_COMMENT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.FILTER_COMMENT_ERR,
            payload: error.response
        })
    }
}
