// 본인 작성 리뷰 목록 조회 요청 (GET /users/me/reviews)
export interface UserReviewListRequest {
    monthRange?: number; // 최근 몇 개월의 리뷰를 조회할지
    page?: number; // 페이지 번호
    size?: number; // 페이지 크기
}

// 본인 작성 리뷰 목록 조회 응답
export interface UserReviewResponse {
    content: UserReview[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface UserReview {
    reviewId: number;
    productId: number;
    productName: string;
    productThumbnail: string;
    rating: number;
    content: string;
    createdAt: string;
    adminReply: AdminReply | null;
}

// 관리자 답변 타입
export interface AdminReply {
    replyId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

// 리뷰 작성 요청 (POST /reviews)
interface AddReviewRequest {
    orderNumber: string;
    orderItemId: number;
    rating: number;
    content: string;
}

// 리뷰 작성 응답
export interface AddReviewResponse {
    reviewId: 0;
    createdAt: string;
}

// 리뷰 수정 요청 (PUT /reviews/:reviewId)
export interface UpdateReviewRequest {
    rating: number;
    content: string;
}

// 리뷰 수정 응답
export interface UpdateReviewResponse {
    updatedAt: string;
}

// 리뷰 삭제 응답 (DELETE /reviews/:reviewId)

// 사용자 리뷰 타입
// export interface UserReview {
//     reviewId?: number;
//     productId?: number;
//     productName?: string;
//     productThumbnail?: string;
//     rating?: number;
//     content?: string;
//     createdAt?: string;
//     adminReply?: AdminReply | null;
// }

// // 사용자 리뷰 목록 응답 타입
// export interface UserReviewListResponse {
//     content?: UserReview[];
//     page?: number;
//     size?: number;
//     totalPages?: number;
//     totalElements?: number;
// }
