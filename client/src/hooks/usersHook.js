import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import  { getAllUsers, getUser, createUser, updateUser, deleteUser, validateUser } from '../API/usersAPI';

export const useUsers = () => {

    return useQuery(['getAllUsers'], getAllUsers);
}

export const useUser = (id) => {

    return useQuery(['getUser', id], () => getUser(id), { staleTime: 0 });
}

export const useCreateUser = () => {

    const queryClient = useQueryClient();
    return useMutation(createUser, { onSuccess: () => { queryClient.invalidateQueries(['getAllUsers']) } });
}

export const useUpdateUser = () => {

    const queryClient = useQueryClient();
    return useMutation(updateUser, { onSuccess: () => queryClient.invalidateQueries(['getAllUsers']) })
}

export const useDeleteUser = () => {

    const queryClient = useQueryClient();
    return useMutation(deleteUser, { onSuccess: () => queryClient.invalidateQueries(['getAllUsers']) });
}

export const useValidate = () => {
    return useMutation(validateUser);
}