import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const createVenta = async (venta) => {

    return await axios.post(`${baseURL}/api/venta/new`, venta);
}

export const getAllVentas = async () => {
 
    const response = await axios.get(`${baseURL}/api/ventas`);
    return response.data;
}

export const getVenta = async (id) => {

    const response = await axios.get(`${baseURL}/api/venta/${id}/`);
    return response.data;
}

export const updateVenta = async (venta) => {

    return await axios.put(`${baseURL}/api/venta/${venta._id}/edit`, venta);
} 

export const deleteVenta = async (id) => {

    return await axios.delete(`${baseURL}/api/venta/${id}/delete`);
}