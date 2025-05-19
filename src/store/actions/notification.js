import actionTypes from "./actionTypes";
import * as apis from '../../apis/notification';

export const getNotification = (search='') => async (dispatch) => {
    try{
        const response = await apis.getNotification();
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_NOTIFICATION,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_NOTIFICATION_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_NOTIFICATION_ERR,
            payload: error.response
        })
    }
}