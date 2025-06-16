import { OrderHistoryPage } from "@/src/features/order/components/OrderHistoryPage";

export const metadata = {
    title: "주문 내역",
    description: "주문한 상품의 내역을 확인할 수 있습니다.",
};

export default async function OrderPage() {
    return <OrderHistoryPage />;
}
