import axios from '../axios';

export const getUser = async () => {
    try{
        const response = await axios({
            url: '/user',
            method: 'get'
        });
        return response;
    }catch(err){
        console.log("Err call api: ", err);
    }
}

export const getUserDetail = async (id) => {
    try{
        const response = await axios({
            url: `/user/${id}`,
            method: 'get'
        });
        return response;
    }catch(err){
        console.log("Err call api: ", err);
    }
}