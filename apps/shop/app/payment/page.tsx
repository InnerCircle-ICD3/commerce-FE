import PaymentForm from "@/src/features/payment/components/PaymentForm";
import OrderList from "@/src/features/order/components/OrderList";
import { OrderItemList } from "@/src/features/payment/components/OrderItemList";
import { PurchaseSummary } from "@/src/features/payment/components/PurchaseSummary";
import SelectPaymentMethod from "@/src/features/order/components/SelectPaymentMethod";

export const metadata = {
    title: "주문서",
    description: "주문 상품과 결제 정보를 입력합니다.",
};

export default function Page() {
    return (
        <div>
            <h1>주문서</h1>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <OrderItemList
                        orderItems={[
                            {
                                title: "주문 상품 1",
                                price: 10000,
                                quantity: 1,
                                image: "",
                            },
                            {
                                title: "주문 상품 2",
                                price: 20000,
                                quantity: 2,
                                image: "",
                            },
                        ]}
                    />
                    <PurchaseSummary />
                </div>
                <div>
                    <PaymentForm />
                </div>
            </div>
        </div>
    );
}
