import { del } from "@/shared/kyInstance";

export const cancelOrder = async (orderId: number) => {
    const response = await del(`admin/orders/${orderId}/cancel`);

    return response;
};
