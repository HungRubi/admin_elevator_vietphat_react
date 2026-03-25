import actionTypes from "./actionTypes";
import * as apis from '../../apis/article';

export const getArticle = (search='') => async(dispatch) => {
    const result = await apis.getArticle(search);
    if(result.ok) {
        dispatch({
            type: actionTypes.GET_ARTICLE,
            payload: {
                data: result.data,
                search: !! search
            }
        })
        return;
    }
    dispatch({
        type: actionTypes.GET_ARTICLE_ERR,
        payload: result.data || { message: result.message }
    })
}

export const getArticleDetail = (id) => async(dispatch) => {
    const result = await apis.getArticleDetail(id);
    dispatch({
        type: actionTypes.GET_DETAIL_ARTICLE,
        payload: result.ok ? result.data : null
    })
}

export const updateArticle = (id, data) => async(dispatch) => {
    const result = await apis.updateArticle(id, data);
    if(result.ok) {
        dispatch({
            type: actionTypes.UPDATE_ARTICLE,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.UPDATE_ARTICLE_ERR,
        payload: result.data || { message: result.message }
    })
}

export const filterArticle = (query, value,query2, value2) => async(dispatch) => {
    const result = await apis.filterArticle(query, value, query2, value2 );
    if(result.ok) {
        dispatch({
            type: actionTypes.FILTER_ARTICLE,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.FILTER_ARTICLE_ERR,
        payload: result.data || { message: result.message }
    })
}

export const createArticle = (data) => async(dispatch) => {
    const result = await apis.createArticle(data);
    if(result.ok) {
        dispatch({
            type: actionTypes.CREATE_ARTICLE,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.CREATE_ARTICLE_ERR,
        payload: result.data || { message: result.message }
    })
}

export const deleteArticle = (id) => async(dispatch) => {
    const result = await apis.deleteArticle(id);
    if(result.ok) {
        dispatch({
            type: actionTypes.DELETE_ARTICLE,
            payload: result.data
        })
        return;
    }
    dispatch({
        type: actionTypes.DELETE_ARTICLE_ERR,
        payload: result.data || { message: result.message }
    })
}