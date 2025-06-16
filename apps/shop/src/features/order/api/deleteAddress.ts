import { fetchClient } from "@/src/shared/fetcher";

export const deleteAddress = async (addressId: number) => {
    const fetch = fetchClient();
    const response = await fetch(`/api/users/addresses/${addressId}`, {
        method: "DELETE",
    });
    return response;
};
