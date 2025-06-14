import OrderCheckoutPage from "@/src/features/order/components/OrderCheckoutPage";
import Loading from "@/src/shared/components/shared/Loading";
import { Suspense } from "react";

export default function OrderCheckout() {
    return (
        <Suspense fallback={<Loading />}>
            <OrderCheckoutPage />
        </Suspense>
    );
}
