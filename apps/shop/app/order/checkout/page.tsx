import AddAddress from "@/src/features/order/components/AddAddress";
import OrderCheckoutList from "@/src/features/order/components/OrderCheckoutList";
import PaymentSummary from "@/src/features/order/components/PaymentSummary";
import SelectPaymentMethod from "@/src/features/order/components/SelectPaymentMethod";
import SelectShippingInfo from "@/src/features/order/components/SelectShippingInfo";

// 테스트용 임시 서버액션. 추후에 서버액션과 React Hook Form 중 선택 예정.
async function handleSubmit(formData: FormData) {
    "use server";

    const selectedAddressId = formData.get("selectedAddressId");
    const deliveryMessage = formData.get("deliveryMessage");

    console.log(selectedAddressId, deliveryMessage);
}

export default function OrderCheckout() {
    return (
        <form action={handleSubmit}>
            <div className="py-16 px-40">
                <h2 className="text-2xl font-bold mb-10">주문서</h2>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <section className="mb-10">
                            <h4 className="text-lg font-bold mb-4">배송지선택</h4>
                            <SelectShippingInfo />
                        </section>

                        <section className="mb-10">
                            <h4 className="text-lg font-bold">주문 상품</h4>
                            <div className="p-4 rounded-2xl border border-gray-200">
                                <OrderCheckoutList
                                    items={[
                                        {
                                            id: 1,
                                            name: "상품명",
                                            price: 10000,
                                            quantity: 1,
                                            image: "/images/coffee.jpg",
                                        },
                                        {
                                            id: 2,
                                            name: "상품명",
                                            price: 10000,
                                            quantity: 1,
                                            image: "/images/coffee.jpg",
                                        },
                                    ]}
                                />
                            </div>
                        </section>
                        <section>
                            <h4 className="text-lg font-bold">결제 수단</h4>
                            <SelectPaymentMethod />
                        </section>
                    </div>
                    <div>
                        <section className="px-14 py-15 border border-gray-200 rounded-2xl">
                            <PaymentSummary />
                        </section>
                    </div>
                </div>
            </div>
        </form>
    );
}
