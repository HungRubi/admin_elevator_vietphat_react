import axios from "../axios";

export const getOrder = async () => {
    try{
        const response = await axios({
            url: '/order',
            method: 'get'
        })
        return response
    }catch(err){
        console.log("Err call api: ", err);
    }
}