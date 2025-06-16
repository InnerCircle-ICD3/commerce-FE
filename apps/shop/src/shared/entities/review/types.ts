// 백엔드 API용 리뷰 타입 (product API에서 사용)
export interface ReviewResponse {
    content: ReviewType[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface ReviewType {
    reviewId: number;
    nickname: string;
    rating: number;
    createdAt: string;
    content: string;
    images?: string[];
    adminReply?: AdminReply;
}

// 관리자 답변 인터페이스
export interface AdminReply {
    replyId?: number;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}

// 사용자 리뷰 (myReviews에서 사용)
export type UserReview = Omit<ReviewType, "nickname"> & {
    product: {
        productId: number;
        productName: string;
        productThumbnail: string;
    };
};

// 리뷰 작성 요청 (POST /reviews)
export interface AddReviewRequest {
    orderNumber?: string;
    orderItemId?: number;
    rating?: number;
    content?: string;
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

// 평점 분포 인터페이스 (ProductReviews 컴포넌트에서 사용)
export interface RatingDistribution {
    oneStarCount: number;
    twoStarsCount: number;
    threeStarsCount: number;
    fourStarsCount: number;
    fiveStarsCount: number;
}

// 리뷰 통계 응답 (GET /products/:productId/reviews/rating)
export interface ProductReviewRatingResponse {
    averageRating: number;
    ratingDistribution: {
        [key in RatingKey]: number;
    };
}

const ratingKeys = ["oneStarCount", "twoStarsCount", "threeStarsCount", "fourStarsCount", "fiveStarsCount"] as const;
type RatingKey = (typeof ratingKeys)[number];
