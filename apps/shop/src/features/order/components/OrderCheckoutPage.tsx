"use client";
import OrderCheckoutList from "@/src/features/order/components/OrderCheckoutList";
import SelectPaymentMethod from "@/src/features/order/components/SelectPaymentMethod";
import SelectShippingInfo from "@/src/features/order/components/SelectShippingInfo";
import useCreateOrder from "../hooks/useCreateOrder";
import { useToast } from "@/src/shared/hooks/useToast";
import { useCreatePayment } from "../../payment/hooks/useCreatePayment";
import { useEffect, useState } from "react";
import type { AddressType } from "../types";
import { useOrderPrepare } from "../hooks/useOrderPrepare";
import { createUUID } from "@/src/shared/utils/uuid";
import { useSearchParams } from "next/navigation";
import PaymentSummary from "./PaymentSummary";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ErrorComponent from "@/src/shared/components/shared/ErrorComponent";

export default function OrderCheckoutPage() {
    const { toast, ToastUI } = useToast();
    const params = useSearchParams();
    const cartItemIds = params.get("cartItemIds") as string;
    const [shippingInfo, setShippingInfo] = useState<Omit<AddressType, "addressId"> | null>(null);
    const { data: orderPrepareData } = useOrderPrepare({
        cartItemIds: cartItemIds,
    });
    const [deliveryMessage, setDeliveryMessage] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    const { mutate: createPaymentMutate } = useCreatePayment();

    const { createOrderMutate } = useCreateOrder({
        onError: error => {
            toast({
                message: error.message,
            });
        },
        onSuccess: data => {
            if (data.data && paymentMethod) {
                // TODO: 생성된 주문 번호와 함께 결제 sdk 호출
                createPaymentMutate({
                    orderNumber: data.data.orderNumber,
                    transactionId: `payment-${createUUID()}`,
                    paymentMethod,
                });
            }
        },
    });

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!shippingInfo) {
            toast({
                message: "배송지를 선택해주세요.",
            });
            return;
        }
        createOrderMutate({
            shippingInfo,
            cartItemIds,
            deliveryMessage,
        });
    };

    const handleShippingInfo = (address: AddressType) => {
        setShippingInfo({
            address1: address.address1,
            address2: address.address2,
            isDefault: address.isDefault,
            recipientName: address.recipientName,
            recipientPhone: address.recipientPhone,
            zipCode: address.zipCode,
            alias: address.alias,
        });
    };

    useEffect(() => {
        if (orderPrepareData?.data) {
            setShippingInfo(orderPrepareData.data.shippingInfo);
            setPaymentMethod(orderPrepareData.data.paymentMethod[0].code);
        }
    }, [orderPrepareData]);

    return (
        <ErrorBoundary errorComponent={ErrorComponent}>
            <form onSubmit={handlePayment}>
                <div className="py-16 px-40 max-lg:px-10 max-lg:py-8">
                    <h2 className="text-2xl font-bold mb-10">주문서</h2>
                    <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
                        <div>
                            <section className="mb-10">
                                <h4 className="text-lg font-bold mb-4">배송지선택</h4>
                                {shippingInfo && (
                                    <SelectShippingInfo
                                        shipingInfo={shippingInfo}
                                        onChangeAddress={handleShippingInfo}
                                        onChangeDeliveryMessage={setDeliveryMessage}
                                    />
                                )}
                            </section>

                            <section className="mb-10">
                                <h4 className="text-lg font-bold">주문 상품</h4>
                                <div className="p-4 rounded-2xl border border-gray-200">
                                    <OrderCheckoutList items={orderPrepareData?.data?.items || []} />
                                </div>
                            </section>
                            <section>
                                <h4 className="text-lg font-bold">결제 수단</h4>
                                <SelectPaymentMethod
                                    paymentMethods={orderPrepareData?.data?.paymentMethod || []}
                                    onChangePaymentMethod={paymentMethod => {
                                        setPaymentMethod(paymentMethod);
                                    }}
                                />
                            </section>
                        </div>
                        <div>
                            <section className="px-14 py-15 border border-gray-200 rounded-2xl">
                                <PaymentSummary
                                    items={
                                        orderPrepareData?.data?.items.map(item => ({
                                            productId: item.productId,
                                            productName: item.name,
                                            unitPrice: item.unitPrice,
                                            quantity: item.quantity,
                                        })) || []
                                    }
                                    shippingFee={orderPrepareData?.data?.shippingFee || 0}
                                    totalPrice={orderPrepareData?.data?.finalTotalPrice || 0}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </form>
            {ToastUI}
        </ErrorBoundary>
    );
}
