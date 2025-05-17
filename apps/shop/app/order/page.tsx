import { getOrderHistory } from "@/src/features/order/api/orderApi";
import { OrderHistoryPage } from "@/src/features/order/OrderHistoryPage";

export default async function OrderPage() {
    const orders = await getOrderHistory();
    return <OrderHistoryPage initialOrders={orders} />;
}
