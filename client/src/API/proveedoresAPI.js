import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const createProveedor= async (proveedor) => {

    return await axios.post(`${baseURL}/api/proveedor/new`, proveedor);
}

export const getAllProveedores = async () => {
 
    const response = await axios.get(`${baseURL}/api/proveedores`);
    return response.data;
}

export const getProveedor = async (id) => {

    const response = await axios.get(`${baseURL}/api/proveedor/${id}/`);
    return response.data;
}

export const updateProveedor = async (proveedor) => {

    return await axios.put(`${baseURL}/api/proveedor/${proveedor._id}/edit`, proveedor);
} 

export const deleteProveedor = async (id) => {

    return await axios.delete(`${baseURL}/api/proveedor/${id}/delete`);
}