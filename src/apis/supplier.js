import axios from "../axios";

export const getSuppliers = async (search='') => {
    try {
        const response = await axios({
            method: "GET",
            url: `/supplier?timkiem=${search}`,
        });
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau",
        };
    }
}

export const addSupplier = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            url: "/supplier/add",
            data: data,
        })
        return response;
    } catch (error) {
        if(error.response) {
            return error.response.data;
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau",
        };
    }
}

export const getDetails = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `/supplier/edit/${id}`,
        })
        return response;
    } catch (error) {
        if(error.response) {
            return error.response.data;
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau",
        };
    }
}

export const update = async (data ,id) => {
    try {
        const response = await axios({
            method: "PUT",
            url: `/supplier/update/${id}`,   
            data: data, 
        })
        return response;
    } catch (error) {
        if(error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau",
        };
    }
}

export const deleteSupplier = async (id) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `/supplier/delete/${id}`,   
        })
        return response;
    } catch (error) {
        if(error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau",
        };
    }
}