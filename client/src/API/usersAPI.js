import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const createUser = async (user) => {

    return await axios.post(`${baseURL}/api/usuario/new`, user);
}

export const getAllUsers = async () => {
 
    const response = await axios.get(`${baseURL}/api/usuarios`);
    return response.data;
}

export const getUser = async (id) => {

    const response = await axios.get(`${baseURL}/api/usuario/${id}/`);
    return response.data;
}

export const updateUser = async (user) => {

    return await axios.put(`${baseURL}/api/usuario/${user._id}/edit`, user);
} 

export const deleteUser = async (id) => {

    return await axios.delete(`${baseURL}/api/usuario/${id}/delete`);
}

export const validateUser = async ({ username, passwd }) => {
    return await axios.post(`${baseURL}/api/usuario/validate`, { username, passwd });
}