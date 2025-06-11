import type { AddressType } from "../types";

export const getAddresses = async (): Promise<{
    data: AddressType[];
}> => {
    const response = await fetch("http://localhost:3000/api/users/addresses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Simeple-Token",
        },
    });

    return response.json();
};
