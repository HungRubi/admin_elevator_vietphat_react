import actionTypes from "./actionTypes";
import * as apis from "../../apis/warehouse";

export const getWarehouse = (search = '') => async (dispatch) => {
    const result = await apis.getWarehouse(search);
    if (result.ok) {
        dispatch({
            type: actionTypes.GET_WAREHOUSE,
            payload: {
                data: result.data,
                search: !! search
            },
        });
        return;
    }
    dispatch({
        type: actionTypes.GET_WAREHOUSE_ERR,
        payload: result.data || { message: result.message },
    })
}

export const deleteWarehouse = (id) => async (dispatch) => {
    const result = await apis.deleteWarehouse(id);
    if (result.ok) {
        dispatch({
            type: actionTypes.DELETE_WAREHOUSE,
            payload: result.data
        });
        return;
    }
    dispatch({
        type: actionTypes.DELETE_WAREHOUSE_ERR,
        payload: result.data || { message: result.message },
    });
}

export const filterWarehouse = (query, value, query2, value2) => async (dispatch) => {
    const result = await apis.filterWarehouse(query, value, query2, value2);
    if(result.ok) {
        dispatch({
            type: actionTypes.FILTER_WAREHOUSE,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.FILTER_WAREHOUSE_ERR,
        payload: result.data || { message: result.message }
    })
}