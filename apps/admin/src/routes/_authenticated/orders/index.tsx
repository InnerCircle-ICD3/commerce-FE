import OrdersPage from "@/pages/orders/Orders";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/orders/")({
    component: OrdersPage,
});
