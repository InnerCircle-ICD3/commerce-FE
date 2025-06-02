import { fetchData } from "@/src/shared/utils/api";
import { getMockUserReviews } from "@/src/features/myReviews/mocks/userReviewMock";
import type { UserReviewListResponse } from "@/src/features/myReviews/types";

/**
 * 사용자가 작성한 리뷰 목록을 가져오는 API 함수
 */
export async function getUserReviews(page = 0, size = 10): Promise<UserReviewListResponse> {
    const defaultValue = {
        content: [],
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    };

    // 목 데이터 생성 함수
    const mockFn = () => getMockUserReviews(page, size);

    return fetchData({
        endpoint: `/users/me/reviews?page=${page}&size=${size}`,
        defaultValue,
        mockDataFn: mockFn,
    });
}
