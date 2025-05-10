import actionTypes from "./actionTypes";
import * as apis from '../../apis/supplier';

export const getSuppliers = (search='') => async (dispatch) => {
    try{
        const response = await apis.getSuppliers(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_SUPPLIER,
                payload: {
                    data: response.data,
                    search: !! search
                },
            })
        }else{
            dispatch({
                type: actionTypes.GET_SUPPLIER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_SUPPLIER_ERR,
            payload: error.response
        })
    }
}

export const addSupplier = (data) => async (dispatch) => {
    try{
        const response = await apis.addSupplier(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.ADD_SUPPLIER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.ADD_SUPPLIER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.ADD_SUPPLIER_ERR,
            payload: error.response
        })
    }
}

export const getDetails = (id) => async (dispatch) => {
    try{
        const response = await apis.getDetails(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_DETAIL_SUPPLIER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_DETAIL_SUPPLIER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_DETAIL_SUPPLIER_ERR,
            payload: error.response
        })
    }
}

export const update = (id, data) => async (dispatch) => {
    try{
        const response = await apis.update(data, id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_SUPPLIER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_SUPPLIER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_SUPPLIER_ERR,
            payload: error.response
        })
    }
}

export const deleteSupplier = (id) => async (dispatch) => {
    try{
        const response = await apis.deleteSupplier(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.DELETE_SUPPLIER,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_SUPPLIER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.DELETE_SUPPLIER_ERR,
            payload: error.response
        })
    }
}