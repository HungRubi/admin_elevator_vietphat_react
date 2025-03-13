import axios from "../axios";

export const getArticle = async () => {
    try{
        const response = await axios({
            url: '/articles',
            method: 'get'
        })
        return response;
    }catch(err){
        console.log("Err call api: ", err);
    }
}