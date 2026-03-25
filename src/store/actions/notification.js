import actionTypes from "./actionTypes";
import * as apis from '../../apis/notification';

export const getNotification = (search='') => async (dispatch) => {
    const result = await apis.getNotification(search);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_NOTIFICATION,
            payload: {
                data: result.data,
                search: !! search
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_NOTIFICATION_ERR,
        payload: result.data || { message: result.message }
    })
}

export const editNotification = (id) => async (dispatch) => {
    const result = await apis.editNotification(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.EDIT_NOTIFICATION,
            payload: result.data,
        })
        return;
    }
    dispatch({
        type: actionTypes.EDIT_NOTIFICATION_ERR,
        payload: result.data || { message: result.message }
    })
}

export const addNotification = (data) => async (dispatch) => {
    const result = await apis.addNotification(data);
    if(result.ok) {
        dispatch({
            type: actionTypes.ADD_NOTIFICATION,
            payload: result.data,
            
        })
        return;
    }
    dispatch({
        type: actionTypes.ADD_NOTIFICATION_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteNotification = (id) => async (dispatch) => {
    const result = await apis.deleteNotification(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.DELETE_NOTIFICATION,
            payload: result.data,
            
        })
        return;
    }
    dispatch({
        type: actionTypes.DELETE_NOTIFICATION_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterNotification = (query, value, query2, value2) => async (dispatch) => {
    try {
        const params = new URLSearchParams();
        if (query && value && value !== 'undefined') params.append(query, value);
        if (query2 && value2 && value2 !== 'undefined') params.append(query2, value2);

        const result = await apis.filterNotification(params.toString());

        if (result.ok) {
            dispatch({
                type: actionTypes.FILTER_NOTIFICATION,
                payload: result.data
            });
            return;
        }
        dispatch({
            type: actionTypes.FILTER_NOTIFICATION_ERR,
            payload: result.data || { message: result.message }
        });
    } catch (err) {
        dispatch({
            type: actionTypes.FILTER_NOTIFICATION_ERR,
            payload: { message: String(err?.message || "Có lỗi xảy ra") }
        });
    }
};

