"use client";
import OrderCheckoutList from "@/src/features/order/components/OrderCheckoutList";
import PaymentSummary from "@/src/features/order/components/PaymentSummary";
import SelectPaymentMethod from "@/src/features/order/components/SelectPaymentMethod";
import SelectShippingInfo from "@/src/features/order/components/SelectShippingInfo";
import type { CartItem } from "@/app/cart/page";
import type { AddressType } from "../types";
import useCreateOrder from "../hooks/useCreateOrder";
import { useToast } from "@/src/shared/hooks/useToast";

export default function OrderCheckoutPage() {
    const cartItems: CartItem[] = [
        {
            id: 1,
            title: "상품 1",
            price: 10000,
            image: "/images/product/product-1.png",
            quantity: 1,
            stockQuantity: 10,
        },
        {
            id: 2,
            title: "상품 2",
            price: 20000,
            image: "/images/product/product-1.png",
            quantity: 1,
            stockQuantity: 10,
        },
    ];
    const paymentMethods: { code: string; label: string }[] = [
        { code: "TOSS", label: "토스" },
        { code: "ACCOUNT", label: "계좌이체" },
    ];

    const addresses: AddressType[] = [
        {
            id: 1,
            alias: "주소 1",
            address1: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
            address2: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
            zipCode: "12345",
            isDefault: true,
            recipientName: "홍길동",
            recipientPhone: "01012345678",
        },
        {
            id: 2,
            alias: "주소 2",
            address1: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
            address2: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
            zipCode: "12345",
            isDefault: false,
            recipientName: "홍길동",
            recipientPhone: "01012345678",
        },
    ];
    const { toast, ToastUI } = useToast();
    const { createOrderMutate } = useCreateOrder({
        onError: error => {
            toast({
                message: error.message,
            });
        },
        onSuccess: data => {
            if (data) {
                // TODO: 생성된 주문 번호와 함께 결제 sdk 호출
            }
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const addressId = formData.get("addressId");
        const deliveryMessage = formData.get("deliveryMessage") as string;
        const paymentMethod = formData.get("paymentMethod") as string;

        // 주문생성과 별개지만, UI상 결제 수단 미선택시 toast
        if (!paymentMethod) {
            toast({
                message: "결제 방법을 선택해주세요.",
            });
            return;
        }

        createOrderMutate({
            addressId: Number(addressId),
            deliveryMessage,
            cartItemIds: cartItems.map(item => item.id),
        });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="py-16 px-40">
                    <h2 className="text-2xl font-bold mb-10">주문서</h2>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <section className="mb-10">
                                <h4 className="text-lg font-bold mb-4">배송지선택</h4>
                                <SelectShippingInfo addresses={addresses} />
                            </section>

                            <section className="mb-10">
                                <h4 className="text-lg font-bold">주문 상품</h4>
                                <div className="p-4 rounded-2xl border border-gray-200">
                                    <OrderCheckoutList
                                        items={cartItems.map(item => ({
                                            id: item.id,
                                            name: item.title,
                                            price: item.price,
                                            quantity: item.quantity,
                                            image: item.image,
                                        }))}
                                    />
                                </div>
                            </section>
                            <section>
                                <h4 className="text-lg font-bold">결제 수단</h4>
                                <SelectPaymentMethod paymentMethods={paymentMethods} />
                            </section>
                        </div>
                        <div>
                            <section className="px-14 py-15 border border-gray-200 rounded-2xl">
                                <PaymentSummary cartItems={cartItems} />
                            </section>
                        </div>
                    </div>
                </div>
            </form>
            {ToastUI}
        </>
    );
}
