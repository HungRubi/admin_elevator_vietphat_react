import actionTypes from "./actionTypes";
import * as apis from "../../apis/warehouse";

export const getWarehouse = (search = '') => async (dispatch) => {
    try{
        const response = await apis.getWarehouse(search);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.GET_WAREHOUSE,
                payload: {
                    data: response.data,
                    search: !! search
                },
            });
        } else {
            dispatch({
                type: actionTypes.GET_WAREHOUSE,
                payload: response.data,
            });
        }
    }catch(error) {
        dispatch({
            type: actionTypes.GET_WAREHOUSE_ERR,
            payload: {
                status: 500,
                message: 'Internal Server Error: ' + error,
            }
        })
    }
}

export const deleteWarehouse = (id) => async (dispatch) => {
    try{
        const response = await apis.deleteWarehouse(id);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_WAREHOUSE,
                payload: response.data
            });
        } else {
            dispatch({
                type: actionTypes.DELETE_WAREHOUSE_ERR,
                payload: response.data,
            });
        }
    }catch(error) {
        dispatch({
            type: actionTypes.DELETE_WAREHOUSE_ERR,
            payload: {
                status: 500,
                message: 'Internal Server Error: ' + error,
            }
        })
    }
}

export const filterWarehouse = (query, value, query2, value2) => async (dispatch) => {{
    try{
        const response = await apis.filterWarehouse(query, value, query2, value2);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_WAREHOUSE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_WAREHOUSE_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.FILTER_WAREHOUSE_ERR,
                payload: error.response.data
            })
    }
}}