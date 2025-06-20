import { fetcher } from "@/shared/kyInstance";

export const updateOrderShipped = async (orderId: number) => {
    const response = await fetcher(`admin/orders/${orderId}/status/shipped`, {
        method: "patch",
    });
    return response;
};
