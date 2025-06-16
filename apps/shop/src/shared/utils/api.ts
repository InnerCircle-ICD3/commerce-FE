import { fetchServer } from "@/src/shared/fetcher";

/**
 * API 호출 함수 옵션 타입
 *
 * @template T API 응답 데이터의 타입
 * 1. 예시) 제품 목록을 가져올 때 -> T는 ProductType[]이 됨
 *    fetchData<ProductType[]>({ ... });
 *
 * 2. 예시) 주문 내역을 가져올 때 -> T는 OrderDetailData가 됨
 *    fetchData<OrderDetailData>({ ... });
 */
export type FetchDataOptions<T> = {
    endpoint: string; // API 엔드포인트 경로 (예: "/api/products")
    defaultValue: T; // API 실패 시 반환할 기본값
    mockDataFn?: () => T; // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
};

/**
 * API 호출 및 에러 처리를 위한 공통 함수
 *
 * @template T 응답 데이터의 타입
 * @param options API 호출 옵션 객체
 * @returns API 응답 데이터 또는 기본값
 */
export async function fetchData<T>(options: FetchDataOptions<T>): Promise<T> {
    const { endpoint, defaultValue, mockDataFn } = options;

    try {
        const fetch = fetchServer();
        const response = await fetch<T>(endpoint);

        // API 응답 데이터가 배열인지 확인 (T가 배열 타입일 경우를 위함)
        if (Array.isArray(defaultValue) && !Array.isArray(response.data)) {
            console.warn(`API 응답이 배열이 아닙니다. 엔드포인트: ${endpoint}, 응답:`, response.data);
            return defaultValue;
        }

        if (response.data === null) {
            return defaultValue;
        }

        return response.data;
    } catch (error: unknown) {
        console.error(error);
        return mockDataFn ? mockDataFn() : defaultValue;

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        // if (process.env.NODE_ENV === "development" && mockDataFn) {
        //     console.log("===== [개발기] API 실패로 목 데이터로 폴백 ======");
        //     return mockDataFn();
        // }
        //
        // return defaultValue;
    }
}
