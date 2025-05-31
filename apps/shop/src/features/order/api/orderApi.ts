import { fetchData } from "@/src/shared/utils/api";
import { getMockOrderDetail } from "@/src/features/order/mocks/orderDetailMock";
import { getMockOrderHistory } from "@/src/features/order/mocks/orderHistoryMock";
import type { OrderDetailData } from "@/src/features/order/types/orderDetail";
import type { OrderHistoryItem } from "@/src/features/order/types/orderHistory";

/**
 * 빈 주문 상세 정보 객체 (에러 발생 시 반환용)
 */
export const emptyOrderDetail: OrderDetailData = {
    orderId: "",
    orderStatus: "",
    orderDate: "",
    products: [],
    paymentItems: [],
    shipping: {
        name: "",
        address: "",
        phone: "",
    },
    totalAmount: 0,
    discount: 0,
};

/**
 * 주문 상세 정보를 가져오는 API 함수
 */
export async function getOrderDetail(orderId: string): Promise<OrderDetailData> {
    // 주문 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockOrderDetail(orderId);

    return fetchData({
        endpoint: `/orders/${orderId}`, // 주문 상세 조회 API 주소
        defaultValue: emptyOrderDetail, // 실패 시 반환할 기본값
        mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
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
