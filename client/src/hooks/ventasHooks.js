import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import  { getAllVentas, getVenta, createVenta, updateVenta, deleteVenta } from '../API/ventasAPI';

export const useVentas = () => {

    return useQuery(['getAllVentas'], getAllVentas);
}

export const useVenta = (id) => {

    return useQuery(['getVenta', id], () => getVenta(id), { staleTime: 0 });
}

export const useCreateVenta = () => {

    const queryClient = useQueryClient();
    return useMutation(createVenta, { onSuccess: () => { queryClient.invalidateQueries(['getAllVentas']) } });
}

export const useUpdateVenta = () => {

    const queryClient = useQueryClient();
    return useMutation(updateVenta, { onSuccess: () => queryClient.invalidateQueries(['getAllVentas']) })
}

export const useDeleteVenta = () => {

    const queryClient = useQueryClient();
    return useMutation(deleteVenta, { onSuccess: () => queryClient.invalidateQueries(['getAllVentas']) });
}
