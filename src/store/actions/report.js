import actionTypes from "./actionTypes";
import * as apis from "../../apis/report";

export const getReport = (query, value, query2, value2, query3, value3) => async (dispatch) => {
    const result = await apis.getReport(query, value, query2, value2, query3, value3);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_REPORT,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_REPORT_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getReprotWeek = () => async (dispatch) => {
    const result = await apis.getReprotWeek();
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_REPORT_WEEK,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_REPORT_WEEK_ERR,
        payload: result.data || { message: result.message }
    })
}