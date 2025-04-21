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

export const createUser = async (data) => {
    try{
        const response = await axios({
            url: `/user/store`,
            method: 'POST',
            data: data
        });
        return response;
    }catch(err){
        if (err.response) {
            return err.response;
        }
        return {
            status: 500,
            data: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau"
            }
        };
    }
}

export const updateUser = async (id, data) => {
    try{
        const response = await axios({
            url: `user/update/address/${id}`,
            method: 'PUT',
            data: data
        });
        return response;
    }catch(err){
        console.log("Err call api: ", err);
    }
}