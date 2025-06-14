import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../api/getAddresses";

export const useAddressQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["addresses"],
        queryFn: () => getAddresses(),
    });

    return {
        addresses: data?.data || [],
        isLoading,
        error,
    };
};
