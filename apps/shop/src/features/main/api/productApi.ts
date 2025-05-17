import { fetchServer } from "@/src/shared/fetcher";
import { getMockProducts } from "@/src/features/main/mocks/productMock";
import type { ProductType } from "@/src/features/main/types/product";

/**
 * 제품 목록을 가져오는 서버 컴포넌트용 API 함수
 */
export async function getProducts(): Promise<ProductType[]> {
    try {
        const fetch = fetchServer();
        const response = await fetch<ProductType[]>("/api/products");
        if (response.data === null) {
            return [];
        }
        return response.data;
    } catch (error: unknown) {
        console.error("제품 목록 조회 실패:", error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log("===== [개발기] API 실패로 제품 목 데이터로 폴백 ======");
            return getMockProducts();
        }

        return [];
    }
}
