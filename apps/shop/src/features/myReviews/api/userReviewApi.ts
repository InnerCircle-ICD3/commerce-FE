import { fetchData } from "@/src/shared/utils/api";
import { getMockUserReviews } from "@/src/features/myReviews/mocks/userReviewMock";
import type { UserReviewListRequest, UserReviewResponse } from "@/src/features/myReviews/types";

/**
 * 사용자가 작성한 리뷰 목록을 가져오는 API 함수
 */
export async function getUserReviews({ monthRange, page, sort }: UserReviewListRequest): Promise<UserReviewResponse> {
    const defaultValue = {
        content: [],
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    };

    // 목 데이터 생성 함수
    const mockFn = () => getMockUserReviews(page, 10);

    const params = new URLSearchParams();
    if (monthRange) params.append("monthRange", monthRange.toString());
    params.append("page", page.toString());
    if (sort) params.append("sort", sort);

    return fetchData({
        endpoint: `/reviews:byAuthor?${params.toString()}`,
        defaultValue,
        mockDataFn: mockFn,
    });
}
