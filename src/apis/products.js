import axios from "../axios";

export const getProducts = async () => {
    try {
        const response = await axios({
            url: `/products`,
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
