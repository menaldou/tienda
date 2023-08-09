import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import  { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../API/productsAPI';

export const useProducts = () => {

    return useQuery(['getAllProducts'], getAllProducts);
}

export const useProduct = (id) => {

    return useQuery(['getProduct', id], () => getProduct(id), { staleTime: 0 });
}

export const useCreateProduct = () => {

    const queryClient = useQueryClient();
    return useMutation(createProduct, { onSuccess: () => { queryClient.invalidateQueries(['getAllProducts']) } });
}

export const useUpdateProduct = () => {

    const queryClient = useQueryClient();
    return useMutation(updateProduct, { onSuccess: () => queryClient.invalidateQueries(['getAllProducts']) })
}

export const useDeleteProduct = () => {

    const queryClient = useQueryClient();
    return useMutation(deleteProduct, { onSuccess: () => queryClient.invalidateQueries(['getAllProducts']) });
}