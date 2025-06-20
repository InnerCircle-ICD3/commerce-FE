import { fetcher } from "@/shared/kyInstance";

export const updateOrderDelivered = async (orderId: number) => {
    const response = await fetcher(`admin/orders/${orderId}/status/delivered`, {
        method: "patch",
    });
    return response;
};
