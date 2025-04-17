import axios from "../axios";

export const getComment = async () => {
    try{
        const response = await axios({
            url: 'comment/all',
            method: 'GET',
        })
        return response;
    }catch(error){
        console.log(error)
    }
}