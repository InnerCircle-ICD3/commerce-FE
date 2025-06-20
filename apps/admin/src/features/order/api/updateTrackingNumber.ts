import { fetcher } from "@/shared/kyInstance";

export const updateTrackingNumber = async ({ orderId, trackingNumber }: { orderId: number; trackingNumber: string }) => {
    const response = await fetcher(`admin/orders/${orderId}/status/preparing-shipment`, {
        method: "PATCH",
        json: { trackingNumber },
    });

    return response;
};
