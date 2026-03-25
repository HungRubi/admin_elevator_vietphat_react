import actionTypes from "./actionTypes";
import * as apis from '../../apis/comments';

export const getComment = (search='') => async (dispatch) => {
    const result = await apis.getComment(search);
    if(result.ok){
        dispatch({
            type: actionTypes.GET_COMMENT,
            payload: {
                data: result.data,
                search: !! search
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_COMMENT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterComment = (query, value, query2, value2) => async (dispatch) => {
    const result = await apis.filterComment(query, value, query2, value2);
    if(result.ok){
        dispatch({
            type: actionTypes.FILTER_COMMENT,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.FILTER_COMMENT_ERR,
        payload: result.data || { message: result.message }
    })
}
