import actionTypes from "./actionTypes";
import * as apis from "../../apis/warranty";

export const getAdd = () => async (dispatch) => {{
    try{
        const response = await apis.getAdd();
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_ADD_WARRANTY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ADD_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.GET_ADD_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}