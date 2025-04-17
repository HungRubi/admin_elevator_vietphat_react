import actionTypes from "./actionTypes";
import * as apis from '../../apis/comments';

export const getComment = () => async (dispatch) => {
    try{
        const response = await apis.getComment();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_COMMENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_COMMENT,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_COMMENT,
            payload: error
        })
    }
}