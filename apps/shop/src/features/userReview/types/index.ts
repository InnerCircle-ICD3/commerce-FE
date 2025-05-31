// 관리자 답변 타입
export interface AdminReply {
    replyId?: number;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}

// 사용자 리뷰 타입
export interface UserReview {
    reviewId?: number;
    productId?: number;
    productName?: string;
    productThumbnail?: string;
    rating?: number;
    content?: string;
    createdAt?: string;
    adminReply?: AdminReply | null;
}

// 사용자 리뷰 목록 응답 타입
export interface UserReviewListResponse {
    content?: UserReview[];
    page?: number;
    size?: number;
    totalPages?: number;
    totalElements?: number;
}
