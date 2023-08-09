import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const createProduct = async (product) => {

    return await axios.post(`${baseURL}/api/producto/new`, product);
}

export const getAllProducts = async () => {
 
    const response = await axios.get(`${baseURL}/api/productos`);
    return response.data;
}

export const getProduct = async (id) => {

    const response = await axios.get(`${baseURL}/api/producto/${id}/`);
    return response.data;
}

export const updateProduct = async (product) => {

    return await axios.put(`${baseURL}/api/producto/${product._id}/edit`, product);
} 

export const deleteProduct = async (id) => {

    return await axios.delete(`${baseURL}/api/producto/${id}/delete`);
}