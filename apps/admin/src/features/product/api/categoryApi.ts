import { api } from "@/shared/kyInstance";

export interface CodeResponse {
    id: string;
    label: string;
}

export interface CategoryApiResponse {
    cupSizes: CodeResponse[];
    intensities: CodeResponse[];
}

interface CategoryApiWrapper {
    data: CategoryApiResponse;
    error: null;
}

/**
 * 상품 카테고리 (강도, 컵사이즈) 목록 조회
 */
export async function getCategories(): Promise<CategoryApiResponse> {
    console.log("[getCategories] Fetching categories from backend");

    try {
        const response = await api.get("products/categories").json<CategoryApiWrapper>();

        console.log("[getCategories] Categories fetched successfully:", response);
        console.log("[getCategories] Cup sizes count:", response.data.cupSizes?.length || 0);
        console.log("[getCategories] Intensities count:", response.data.intensities?.length || 0);

        // 실제 데이터 구조
        console.log("[getCategories] Cup sizes:", response.data.cupSizes);
        console.log("[getCategories] Intensities:", response.data.intensities);

        return response.data;
    } catch (error) {
        console.error("[getCategories] Failed to fetch categories:", error);
        throw new Error("카테고리 목록을 불러오는 데 실패했습니다.");
    }
}

/**
 * React Query용 카테고리 훅에서 사용할 쿼리 키
 */
export const categoryQueryKeys = {
    all: ['categories'] as const,
    list: () => [...categoryQueryKeys.all, 'list'] as const,
} as const; 