import { fetchData } from "@/src/shared/utils/api";
import { getMockCategories } from "@/src/features/main/mocks/categoryMock";
import type { Category } from "@/src/features/main/types/category";

/**
 * 카테고리 목록을 가져오는 서버 컴포넌트용 API 함수
 */
export async function getCategories(): Promise<Category[]> {
    return getMockCategories();
    // return fetchData({
    //     endpoint: "/products-categories", // 없는 API
    //     defaultValue: [], // 실패 시 반환할 기본값
    //     mockDataFn: getMockCategories, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    // });
}
