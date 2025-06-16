import OrderCheckoutPage from "@/src/features/order/components/OrderCheckoutPage";
import ErrorComponent from "@/src/shared/components/shared/ErrorComponent";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export const metadata = {
    title: "주문 결제",
    description: "결제 정보를 입력하고 주문을 완료합니다.",
};

export default function OrderCheckout() {
    return (
        <ErrorBoundary errorComponent={ErrorComponent}>
            <OrderCheckoutPage />
        </ErrorBoundary>
    );
}
