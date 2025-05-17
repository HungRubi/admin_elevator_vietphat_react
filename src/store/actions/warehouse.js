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