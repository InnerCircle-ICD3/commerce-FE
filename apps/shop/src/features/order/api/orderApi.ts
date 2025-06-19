import { fetchData } from "@/src/shared/utils/api";
import { getMockOrderHistory } from "@/src/features/order/mocks/orderHistoryMock";
import type { OrderDetailData } from "@/src/features/order/types/orderDetail";
import type { OrderHistoryItem } from "@/src/features/order/types/orderHistory";
import { fetchServer } from "@/src/shared/fetcher";

/**
 * 빈 주문 상세 정보 객체 (에러 발생 시 반환용)
 */
export const emptyOrderDetail: OrderDetailData = {
    orderNumber: "1",
    orderStatus: "WAITING_FOR_PAYMENT",
    orderedAt: "",
    paymentNumber: "",
    paymentStatus: "COMPLETED",
    paymentMethod: "",
    itemsSubTotal: 0,
    shippingFee: 0,
    finalTotalPrice: 0,
    items: [],
    shippingInfo: {
        recipientName: "",
        recipientPhone: "",
        zipCode: "",
        address1: "",
        address2: "",
        deliveryMessage: "",
    },
    paidAt: "",
    cancellable: false,
    refundRequested: false,
    cancelReason: "",
    canceledAt: "",
    refundable: false,
    refundReason: "",
    refundRequestedAt: "",
    refunded: false,
    refunedAt: "",
    reviewable: false,
    reviewWritten: false,
};

/**
 * 주문 상세 정보를 가져오는 API 함수
 */
export async function getOrderDetail(orderId: string): Promise<{ data: OrderDetailData | null; error: Error | null }> {
    const fetch = fetchServer();
    // 개발 환경에서 mock 데이터 사용
    // if (process.env.NODE_ENV === "development") {
    //     return {
    //         data: {
    //             orderNumber: "ORD-2024-0001",
    //             orderStatus: "DELIVERED",
    //             orderedAt: "2024-01-15 14:30:00",
    //             paymentNumber: "PAY-2024-0001",
    //             paymentStatus: "COMPLETED",
    //             paymentMethod: "신용카드",
    //             itemsSubTotal: 59800,
    //             shippingFee: 3000,
    //             finalTotalPrice: 62800,
    //             items: [
    //                 {
    //                     orderItemId: "OI-2024-0001",
    //                     productSnapshotId: 1,
    //                     name: "유기농 그린티 파우더",
    //                     thumbnail: "/images/products/green-tea.jpg",
    //                     quantity: 2,
    //                     unitPrice: 29900,
    //                     itemSubTotal: 59800,
    //                 },
    //             ],
    //             shippingInfo: {
    //                 recipientName: "홍길동",
    //                 recipientPhone: "010-1234-5678",
    //                 zipCode: "06134",
    //                 address1: "서울특별시 강남구 테헤란로",
    //                 address2: "123-45 6층",
    //                 deliveryMessage: "부재시 경비실에 맡겨주세요",
    //             },
    //             paidAt: "2024-01-15 14:30:00",
    //             cancellable: false,
    //             refundRequested: false,
    //             cancelReason: "",
    //             canceledAt: "",
    //             refundable: true,
    //             refundReason: "",
    //             refundRequestedAt: "",
    //             refunded: false,
    //             refunedAt: "",
    //             reviewable: true,
    //             reviewWritten: false,
    //         },
    //         error: null,
    //     };
    // }
    const response = await fetch<OrderDetailData>(`/orders/${orderId}`);
    return response;
}

/**
 * 주문 내역 목록을 가져오는 API 함수
 */
export async function getOrderHistory(): Promise<OrderHistoryItem[]> {
    return fetchData({
        endpoint: "/orders", // 주문 내역 목록 조회 API 주소
        defaultValue: [], // 실패 시 반환할 기본값
        mockDataFn: getMockOrderHistory, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}
