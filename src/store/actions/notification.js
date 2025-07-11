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

export const editNotification = (id) => async (dispatch) => {
    try{
        const response = await apis.editNotification(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.EDIT_NOTIFICATION,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.EDIT_NOTIFICATION_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.EDIT_NOTIFICATION_ERR ,
            payload: error.response
        })
    }
}

export const addNotification = (data) => async (dispatch) => {
    try{
        const response = await apis.addNotification(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_NOTIFICATION,
                payload: response.data,
                
            })
        }else{
            dispatch({
                type: actionTypes.ADD_NOTIFICATION_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.ADD_NOTIFICATION_ERR,
            payload: error.response
        })
    }
}

export const deleteNotification = (id) => async (dispatch) => {
    try{
        const response = await apis.deleteNotification(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_NOTIFICATION,
                payload: response.data,
                
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_NOTIFICATION_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.DELETE_NOTIFICATION_ERR,
            payload: error.response
        })
    }
}

export const filterNotification = (query, value, query2, value2) => async (dispatch) => {
    try {
        const params = new URLSearchParams();
        if (query && value && value !== 'undefined') params.append(query, value);
        if (query2 && value2 && value2 !== 'undefined') params.append(query2, value2);

        const response = await apis.filterNotification(params.toString());

        if (response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_NOTIFICATION,
                payload: response.data
            });
        } else {
            dispatch({
                type: actionTypes.FILTER_NOTIFICATION_ERR,
                payload: response.data
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.FILTER_NOTIFICATION_ERR,
            payload: err.response
        });
    }
};

