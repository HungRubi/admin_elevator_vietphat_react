import actionTypes from "./actionTypes";
import * as apis from '../../apis/notification';

export const getNotification = () => async (dispatch) => {
    try{
        const response = await apis.getNotification();
    }catch(error){

    }
}