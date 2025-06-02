import { fetchData } from "@/src/shared/utils/api";
import { getMockUserReviews } from "@/src/features/userReview/mocks/userReviewMock";
import type { UserReviewListRequest, UserReviewResponse } from "@/src/features/userReview/types";

/**
 * 사용자가 작성한 리뷰 목록을 가져오는 API 함수
 */
export async function getUserReviews({ monthRange, page }: UserReviewListRequest): Promise<UserReviewResponse> {
    const defaultValue = {
        content: [],
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    };

    // 목 데이터 생성 함수
    const mockFn = () => getMockUserReviews(page, 10);

    return fetchData({
        endpoint: `/users/me/reviews?${monthRange ? `monthRange=${monthRange}` : ""}&page=${page}`,
        defaultValue,
        mockDataFn: mockFn,
    });
}
