import { getOrderList } from "@/src/features/order/api/getOrderList";
import { OrderHistoryPage } from "@/src/features/order/OrderHistoryPage";

export default async function OrderPage() {
    const { data } = await getOrderList();

    return <OrderHistoryPage initialOrders={data?.content ?? []} />;
}
