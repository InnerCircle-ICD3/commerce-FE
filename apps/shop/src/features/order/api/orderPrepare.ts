import type { OrderPrepareResponse } from "../types/orderPrepare";

export const orderPrepare = async (
    cartItemIds: string,
): Promise<{
    data: OrderPrepareResponse | null;
    error: Error | null;
}> => {
    const response = await fetch(`http://localhost:3000/api/orders/prepare?cartItemIds=${cartItemIds}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Simeple-Token",
        },
    });
    return response.json();
};
