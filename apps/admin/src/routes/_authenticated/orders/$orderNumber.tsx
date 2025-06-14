import OrderDetailPage from "@/pages/orders/OrderDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/orders/$orderNumber")({
    loader: async ({ params }) => {
        return {
            orderNumber: params.orderNumber,
        };
    },
    component: OrderDetailPage,
});
