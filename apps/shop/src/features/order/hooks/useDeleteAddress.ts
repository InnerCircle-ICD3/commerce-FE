import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../api/deleteAddress";

interface UseDeleteAddressProps {
    onSuccess?: () => void;
    onError?: () => void;
}

export const useDeleteAddress = (props?: UseDeleteAddressProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            props?.onSuccess?.();
        },
    });

    return {
        mutate,
        isPending,
    };
};
