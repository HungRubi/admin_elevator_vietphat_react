import axios from "../axios";

export const getProducts = async (search='') => {
    try {
        const response = await axios({
            url: `/products/admin?timkiem=${search}`,
            method: 'get',
        });
        return response; 
    } catch (err) {
        console.log("Lỗi khi gọi API:", err);
        throw err; 
    }
};

export const getProductsEdit = async (id) => {
    try {
        const response = await axios({
            url: `/products/${id}`,
            method: 'get',
        });
        return response; 
    } catch (err) {
        console.log("Lỗi khi gọi API:", err);
        throw err; 
    }
};

export const createProduct = async (data) => {
    try {
        const response = await axios({
            url: `/products/store`,
            method: 'POST',
            data: data
        });
        return response; 
    } catch (err) {
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
};

export const updateProduct = async (data, id) => {
    try {
        const response = await axios({
            url: `/products/${id}`,
            method: 'PUT',
            data: data
        });
        return response; 
    } catch (err) {
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
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios({
            url: `/products/${id}`,
            method: 'DELETE',
        });
        return response; 
    } catch (err) {
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
};

export const filterProduct = async (query, value, query2, value2) => {
    try{
        const response = await axios({
            url: `/products/filter?${query}=${value}&${query2}=${value2}`,
            method: 'GET',
        })
        return response;
    }catch(error){
        if (error.response) {
            return error.response;
        }
        return {
            status: 500,
            data: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau"
            }
        };
    }
}
