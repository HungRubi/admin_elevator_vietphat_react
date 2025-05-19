import axios from "../axios"; 

export const  getNotification = async (search="") => {
    try{
        const response = await axios({
            method: "GET",
            url: `/notification?timkiem=${search}`
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