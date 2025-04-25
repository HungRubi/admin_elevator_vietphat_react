import axios from "../axios";

export const getArticle = async (search) => {
    try{
        const response = await axios({
            url: `/articles/admin?timkiem=${search}`,
            method: 'get'
        })
        return response;
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng quay lại sau"
        }
    }
}

export const getArticleDetail = async (id) => {
    try{
        const response = await axios({
            url: `/articles/${id}`,
            method: 'get'
        })
        return response;
    }catch(err){
        console.log("Err call api: ", err);
    }
}

export const createArticle = async (data) => {
    try{
        const response = await axios({
            url: `/articles/store`,
            method: 'POST',
            data: data
        })
        return response;
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Có lỗi sảy ra vui lòng thử lại sau"
        }
    }
}

export const deleteArticle = async (id) => {
    try{
        const response = await axios({
            url: `/articles/${id}`,
            method: 'DELETE',
        })
        return response;
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Có lỗi sảy ra vui lòng thử lại sau"
        }
    }
}

export const updateArticle = async (id, data) => {
    try{
        const response = await axios({
            url: `/articles/${id}`,
            method: 'PUT',
            data: data
        })
        return response;
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Có lỗi sảy ra vui lòng thử lại sau"
        }
    }
}

export const filterArticle = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            url: `/articles/filter?${query}=${value}&${query2}=${value2}`,
            method: 'GET',
        })
        return response;
    }catch(err){
        if(err.response){
            return err.response
        }
        return {
            status: 500,
            message: "Có lỗi sảy ra vui lòng thử lại sau"
        }
    }
}