import { fetchServer, fetchClient, type CustomError } from "@/src/shared/fetcher";
import { getMockOrderDetail } from "@/src/features/order/mocks/orderDetailMock";
import { getMockOrderHistory } from "@/src/features/order/mocks/orderHistoryMock";
import type { OrderDetailData } from "@/src/features/order/mocks/orderDetailMock";
import type { OrderHistoryItem } from "@/src/features/order/mocks/orderHistoryMock";

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
    try {
        const fetch = fetchServer();
        const response = await fetch<OrderDetailData>(`/api/orders/${orderId}`);
        if (response.data === null) {
            return emptyOrderDetail;
        }
        return response.data;
    } catch (error: unknown) {
        console.error("주문 상세 정보 조회 실패:", error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log("===== [개발기] API 실패로 주문상세 목 데이터로 폴백 ======");
            return getMockOrderDetail(orderId);
        }

        return emptyOrderDetail;
    }
}

/**
 * 주문 내역 목록을 가져오는 API 함수
 */
export async function getOrderHistory(): Promise<OrderHistoryItem[]> {
    try {
        const fetch = fetchServer();
        const response = await fetch<OrderHistoryItem[]>("/api/orders");
        if (response.data === null) {
            return [];
        }
        return response.data;
    } catch (error: unknown) {
        console.error("주문 내역 조회 실패:", error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log("===== [개발기] API 실패로 주문내역 목 데이터로 폴백 ======");
            return getMockOrderHistory();
        }

        return [];
    }
}
