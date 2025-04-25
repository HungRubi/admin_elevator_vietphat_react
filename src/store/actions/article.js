import actionTypes from "./actionTypes";
import * as apis from '../../apis/article';

export const getArticle = (search='') => async(dispatch) => {
    try{
        const response = await apis.getArticle(search);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_ARTICLE,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_ARTICLE_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ARTICLE_ERR,
            payload: err.response,
        })
    }
}

export const getArticleDetail = (id) => async(dispatch) => {
    try{
        const response = await apis.getArticleDetail(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_DETAIL_ARTICLE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_DETAIL_ARTICLE,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_DETAIL_ARTICLE,
            payload: null,
            err
        })
    }
}

export const updateArticle = (id, data) => async(dispatch) => {
    try{
        const response = await apis.updateArticle(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_ARTICLE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_ARTICLE_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.UPDATE_ARTICLE_ERR,
            payload: err.response,
        })
    }
}

export const filterArticle = (query, value,query2, value2) => async(dispatch) => {
    try{
        const response = await apis.filterArticle(query, value, query2, value2 );
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_ARTICLE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_ARTICLE_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_ARTICLE_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const createArticle = (data) => async(dispatch) => {
    try{
        const response = await apis.createArticle(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.CREATE_ARTICLE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.CREATE_ARTICLE_ERR,
                payload: {
                    message: "Lỗi hệ thống vui lòng quay lại sau"
                }
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.CREATE_ARTICLE_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}

export const deleteArticle = (id) => async(dispatch) => {
    try{
        const response = await apis.deleteArticle(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_ARTICLE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_ARTICLE_ERR,
                payload: {
                    message: "Lỗi hệ thống vui lòng quay lại sau"
                }
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.DELETE_ARTICLE_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}