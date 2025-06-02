// 공통 타입들을 shared/entities에서 import
import type { AdminReply, UserReview } from "@/src/shared/entities/review/types";
export type { AdminReply, UserReview };

// 사용자 리뷰 목록 응답 타입
export interface UserReviewListResponse {
    content?: UserReview[];
    page?: number;
    size?: number;
    totalPages?: number;
    totalElements?: number;
}
