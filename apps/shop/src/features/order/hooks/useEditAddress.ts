import { fetchClient } from "@/src/shared/fetcher";
import { useMutation } from "@tanstack/react-query";
import type { AddressType } from "../types";

type EditAddressDto = {
    address: Omit<AddressType, "id"> & Partial<Pick<AddressType, "id">>;
};

type UseEditAddressOption = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useEditAddress = (options?: UseEditAddressOption) => {
    const fetch = fetchClient();

    const editAddress = async ({ address }: EditAddressDto) => {
        const url = address.id ? `/address/${address.id}` : "/address";
        const response = await fetch(url, {
            method: address.id ? "PUT" : "POST",
            body: JSON.stringify(address),
        });
        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: editAddress,
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });

    return { mutate, isPending };
};
