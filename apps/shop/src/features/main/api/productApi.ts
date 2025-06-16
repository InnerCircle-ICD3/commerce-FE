import { fetchData } from "@/src/shared/utils/api";
import { getMockProducts } from "@/src/features/main/mocks/productMock";
import type { ProductType } from "@/src/features/main/types/product";

/**
 * 메인 페이지 제품 응답 타입
 */
export interface MainProductResponse {
    new: ProductType[];
    best: ProductType[];
}
/**
 * 제품 목록을 가져오는 서버 컴포넌트용 API 함수

 */
export async function getProducts(): Promise<ProductType[]> {
    return fetchData({
        endpoint: "/products", // 제품 목록 조회 API 주소
        defaultValue: [], // 실패 시 반환할 기본값
        mockDataFn: getMockProducts, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}
/**
 * 제품 목록을 가져오는 서버 컴포넌트용 API 함수
 * 참고: 백엔드 API가 수정되어 { new: Product[], best: Product[] } 형태로 응답을 반환합니다.
 */
export async function getMainProducts(): Promise<MainProductResponse> {
    return fetchData({
        endpoint: "/products/main", // 메인 페이지 제품 목록 조회를 위한 올바른 API 주소
        defaultValue: { new: [], best: [] }, // 실패 시 반환할 기본값
        mockDataFn: () => ({
            new: getMockProducts(),
            best: getMockProducts(),
        }), // 목 데이터 변환
    });
}
