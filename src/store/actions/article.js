import actionTypes from "./actionTypes";
import * as apis from '../../apis/article';

export const getArticle = () => async(dispatch) => {
    try{
        const response = await apis.getArticle();
        if(response.status === 200) {
            dispatch({
                type: actionTypes.GET_ARTICLE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ARTICLE,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ARTICLE,
            payload: null,
            err
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