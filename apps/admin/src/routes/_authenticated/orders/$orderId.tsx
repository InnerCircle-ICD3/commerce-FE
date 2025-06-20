import OrderDetailPage from "@/pages/orders/OrderDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/orders/$orderId")({
    loader: async ({ params }) => {
        return {
            orderId: params.orderId,
        };
    },
    component: OrderDetailPage,
});
