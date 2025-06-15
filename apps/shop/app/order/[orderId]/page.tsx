import { OrderHeader, OrderInfo, ShippingInfo, OrderProduct, PaymentInfo } from "@/src/features/order/components";
import { getOrderDetail } from "@/src/features/order/api/orderApi";

export const metadata = {
    title: "주문 상세",
    description: "주문 정보를 확인할 수 있습니다.",
};

interface OrderDetailPageParams {
    params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageParams) {
    // params를 먼저 await
    const resolvedParams = await params;
    const orderId = resolvedParams.orderId;

    // API를 통해 주문 정보 가져오기
    const orderDetail = await getOrderDetail(orderId);
    const { orderStatus, orderDate, products, paymentItems, shipping, totalAmount, discount } = orderDetail;

    return (
        <div className="w-full min-h-screen flex flex-col">
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
                <OrderHeader title="주문 상세" />
                <OrderInfo orderId={orderId} orderDate={orderDate} orderStatus={orderStatus} />
                <ShippingInfo name={shipping.name} address={shipping.address} phone={shipping.phone} memo={shipping.memo} />
                <OrderProduct products={products} />
                <PaymentInfo items={paymentItems} discount={discount} total={totalAmount} />
            </main>
        </div>
    );
}
