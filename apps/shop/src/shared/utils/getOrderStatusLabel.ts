import type { OrderStatus } from "@/src/features/order/types";

export const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
        case "WAITING_FOR_PAYMENT":
            return "결제대기";
        case "PAID":
            return "결제완료";
        case "PREPARING_SHIPMENT":
            return "배송 준비중";
        case "SHIPPED":
            return "배송중";
        case "DELIVERED":
            return "배송완료";
        case "CANCELLED":
            return "취소완료";
        case "REFUNDED":
            return "환불완료";
        case "REFUND_REJECTED":
            return "환불거절";
        case "REFUND_REQUESTED":
            return "환불신청";
        default:
            return "";
    }
};
