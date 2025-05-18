import axios from "../axios"; 

export const  getNotification = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "notification"
        })
        return response
    }catch(error){
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
}