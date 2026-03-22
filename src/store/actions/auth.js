import actionTypes from "./actionTypes";
import * as apis from '../../apis/auth'
import { clearAccessToken, setAccessToken } from "../../axios";

export const login = (data) => async (dispatch) => {
    try {
        const response = await apis.login(data);
        if (response?.status === 200) {
            const token = response?.data?.accessToken;
            setAccessToken(token);
            dispatch({
                type: actionTypes.LOGIN,
                payload: response.data,
            });
            dispatch({
                type: actionTypes.SET_CURRENT_USER,
                user: response?.data?.user || null,
            });
            dispatch({
                type: actionTypes.SET_ACCESS_TOKEN,
                accessToken: token,
            });
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                payload: response.data,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: err.response?.data || "Đã xảy ra lỗi",
        });
    }
};

export const setAccessTokenState = (token) => {
    return {
        type: actionTypes.SET_ACCESS_TOKEN,
        accessToken: token || null,
    }
}

export const logout = () => async (dispatch) => {
    try {
        await apis.logout();
    } finally {
        clearAccessToken();
        dispatch({
            type: actionTypes.LOGOUT
        })
    }
}