import actionTypes from "./actionTypes";
import * as apis from "../../apis/warranty";

export const getWarranty = (search='') => async (dispatch) => {{
    try{
        const response = await apis.getWarranty(search);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_WARRANTY,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.GET_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}

export const getDetail = (id) => async (dispatch) => {{
    try{
        const response = await apis.getDetail(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_DETAIL_WARRANTY,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_DETAIL_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.GET_DETAIL_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}

export const updateWarranty = (id, data) => async (dispatch) => {{
    try{
        const response = await apis.updateWarranty(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_WARRANTY,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.UPDATE_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}

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

export const addWarranty = (data) => async (dispatch) => {{
    try{
        const response = await apis.addWarranty(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_WARRANTY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteWarranty = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteWarranty(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_WARRANTY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}

export const filterWarranty = (query, value, query2, value2) => async (dispatch) => {{
    try{
        const response = await apis.filterWarranty(query, value, query2, value2);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_WARRANTY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_WARRANTY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.FILTER_WARRANTY_ERR,
                payload: error.response.data
            })
    }
}}