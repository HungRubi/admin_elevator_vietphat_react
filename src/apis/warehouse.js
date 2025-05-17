import axios from "../axios";

export const getWarehouse = async (search='') => {
    try{
        const response = await axios({
            method: 'GET',
            url: `/warehouse?timkiem=${search}`,
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: 'Internal Server Error',
        }
    }
}