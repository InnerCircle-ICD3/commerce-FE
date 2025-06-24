import { fetchServer } from "@/src/shared/fetcher";
import type { SearchResultResponse, Product } from "@/src/features/search/types";

interface BackendSearchData {
    content: Product[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

/**
 * 빈 검색 결과를 생성하는 헬퍼 함수
 */
function createEmptySearchResult(searchTerm: string, page: number, size: number): SearchResultResponse {
    return {
        content: [],
        page: page,
        size: size,
        totalPages: 0,
        totalElements: 0,
        searchTerm: searchTerm,
    };
}

/**
 * 에러를 로깅하고 적절한 fallback을 제공하는 헬퍼 함수
 */
function handleSearchError(error: unknown, context: string, searchTerm: string, page: number, size: number): SearchResultResponse {
    console.error(`[검색 API ${context}]:`, error);
    return createEmptySearchResult(searchTerm, page, size);
}

/**
 * 상품 검색 API 함수
 */
export async function searchProducts(
    searchTerm = "",
    page = 1,
    size = 10,
    intensityIds?: string,
    cupSizeIds?: string,
): Promise<SearchResultResponse> {
    try {
        const fetcher = fetchServer();

        // API 호출 파라미터 설정
        const searchParams = new URLSearchParams({
            name: searchTerm,
            page: page.toString(),
            size: size.toString(),
        });

        // 필터 파라미터 추가
        if (intensityIds) {
            searchParams.append("intensityId", intensityIds);
        }
        if (cupSizeIds) {
            searchParams.append("cupSizeId", cupSizeIds);
        }

        const response = await fetcher<BackendSearchData>(`/products?${searchParams}`);

        // API 응답 구조 검증
        if (response.data?.content && Array.isArray(response.data.content)) {
            const backendData = response.data;

            const finalData: SearchResultResponse = {
                content: backendData.content,
                page: backendData.page,
                size: backendData.size,
                totalPages: backendData.totalPages,
                totalElements: backendData.totalElements,
                searchTerm: searchTerm,
            };

            return finalData;
        }

        // API 응답 구조가 예상과 다른 경우
        return handleSearchError(new Error("API 응답 구조가 예상과 다름"), "응답 구조 오류", searchTerm, page, size);
    } catch (error) {
        // 네트워크 오류 또는 기타 예외 상황
        return handleSearchError(error, "네트워크 오류", searchTerm, page, size);
    }
}
