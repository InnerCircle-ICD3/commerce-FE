import { fetchServer } from "@/src/shared/fetcher";
import { getMockCategories } from "@/src/features/main/mocks/categoryMock";
import type { Category } from "@/src/features/main/types/category";

/**
 * 카테고리 목록을 가져오는 서버 컴포넌트용 API 함수
 */
export async function getCategories(): Promise<Category[]> {
    try {
        const fetch = fetchServer();
        const response = await fetch<Category[]>("/api/categories");
        if (response.data === null) {
            return [];
        }
        return response.data;
    } catch (error: unknown) {
        console.error("카테고리 목록 조회 실패:", error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log("===== [개발기] API 실패로 카테고리 목 데이터로 폴백 ======");
            return getMockCategories();
        }

        return [];
    }
}
