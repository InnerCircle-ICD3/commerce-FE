import { fetchClient } from "@/src/shared/fetcher";
import { useMutation } from "@tanstack/react-query";
import type { AddressType } from "../types";

type EditAddressDto = {
    address: Omit<AddressType, "addressId"> & Partial<Pick<AddressType, "addressId">>;
};

type UseEditAddressOption = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useEditAddress = (options?: UseEditAddressOption) => {
    const editAddress = async ({ address }: EditAddressDto) => {
        try {
            const url = address.addressId
                ? `http://localhost:3000/api/users/addresses/${address.addressId}`
                : "http://localhost:3000/api/users/addresses";
            const response = await fetch(url, {
                method: address.addressId ? "PUT" : "POST",
                body: JSON.stringify(address),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer Simeple-Token",
                },
            });
            return response.json();
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: editAddress,
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });

    return { mutate, isPending };
};
