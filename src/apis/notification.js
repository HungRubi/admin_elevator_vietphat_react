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

export const  editNotification = async (id) => {
    try{
        const response = await axios({
            method: "GET",
            url: `notification/${id}`,
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

export const  addNotification = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: `notification/add`,
            data: data
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

export const  deleteNotification = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `notification/${id}`,
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