import OrderCheckoutPage from "@/src/features/order/components/OrderCheckoutPage";

export const metadata = {
    title: "주문 결제",
    description: "결제 정보를 입력하고 주문을 완료합니다.",
};

export default function OrderCheckout() {
    return <OrderCheckoutPage />;
}
