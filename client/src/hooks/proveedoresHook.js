import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import  { getAllProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../API/proveedoresAPI';

export const useProveedores = () => {

    return useQuery(['getAllProveedores'], getAllProveedores);
}

export const useProveedor = (id) => {

    return useQuery(['getProveedor', id], () => getProveedor(id), { staleTime: 0 });
}

export const useCreateProveedor = () => {

    const queryClient = useQueryClient();
    return useMutation(createProveedor, { onSuccess: () => { queryClient.invalidateQueries(['getAllProveedores']) } });
}

export const useUpdateProveedor = () => {

    const queryClient = useQueryClient();
    return useMutation(updateProveedor, { onSuccess: () => queryClient.invalidateQueries(['getAllProveedores']) })
}

export const useDeleteProveedor = () => {

    const queryClient = useQueryClient();
    return useMutation(deleteProveedor, { onSuccess: () => queryClient.invalidateQueries(['getAllProveedores']) });
}