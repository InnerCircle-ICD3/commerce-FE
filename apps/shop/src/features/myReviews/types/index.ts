// 공통 타입들을 shared/entities에서 import
import type { AdminReply, UserReview } from "@/src/shared/entities/review/types";
export type { AdminReply, UserReview };

// 본인 작성 리뷰 목록 조회 요청 (GET /users/me/reviews)
export interface UserReviewListRequest {
    monthRange: number | null; // 최근 몇 개월의 리뷰를 조회할지
    page: number; // 페이지 번호
}

// 사용자 리뷰 목록 응답 타입
export interface UserReviewResponse {
    content: UserReview[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}
