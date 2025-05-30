import actionTypes from "./actionTypes";
import * as apis from "../../apis/report";

export const getReport = (query, value, query2, value2, query3, value3) => async (dispatch) => {{
    try{
        const response = await apis.getReport(query, value, query2, value2, query3, value3);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_REPORT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_REPORT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
        dispatch({
            type: actionTypes.GET_REPORT_ERR,
            payload: error.response.data
        })
    }
}}

export const getReprotWeek = () => async (dispatch) => {{
    try{
        const response = await apis.getReprotWeek();
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_REPORT_WEEK,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_REPORT_WEEK_ERR,
                payload: response.data
            })
        }
    }catch (error) {
        dispatch({
            type: actionTypes.GET_REPORT_WEEK_ERR,
            payload: error.response.data
        })
    }
}}