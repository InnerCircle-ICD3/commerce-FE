import { fetchClient } from "@/src/shared/fetcher";
import type { AddressType } from "../types";

export const getAddresses = async (): Promise<{
    data: AddressType[] | null;
    error: Error | null;
}> => {
    const fetch = fetchClient();
    const response = await fetch<AddressType[]>("/users/addresses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Simeple-Token",
        },
    });

    return response;
};
