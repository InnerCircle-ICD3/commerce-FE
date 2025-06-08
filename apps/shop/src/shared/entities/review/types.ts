// 기본 리뷰 인터페이스 (모든 리뷰 타입의 기본)
export interface BaseReview {
    id: string | number;
    rating: number;
    content: string;
    createdAt: string;
}

// 프론트엔드 UI용 리뷰 (ProductReviewCard에서 사용)
export interface Review {
    id: string;
    reviewer: string;
    rating: number;
    date: string;
    content: string;
    profileImage: string;
    images?: string[];
}

// 백엔드 API용 리뷰 타입 (product API에서 사용)
export interface ReviewResponse {
    content: ReviewType[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface ReviewType {
    id: number;
    user: User;
    rating: number;
    date: string;
    content: string;
    images?: string[];
}

interface User {
    userId: string;
    nickname: string;
}

// 사용자 리뷰 (myReviews에서 사용)
export interface UserReview extends BaseReview {
    reviewId: number;
    productId: number;
    productName: string;
    productThumbnail: string;
    adminReply: AdminReply | null;
}

// 관리자 답변 인터페이스
export interface AdminReply {
    replyId?: number;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}

// API Response 타입들
export interface ReviewWithAdminReply extends BaseReview {
    reviewId: number;
    nickname: string;
    adminReply: AdminReply | null;
}

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

// 타입 변환 유틸리티 함수들
export function convertToReview(review: ReviewType): Review {
    return {
        id: review.id.toString(),
        reviewer: review.user.nickname,
        rating: review.rating,
        date: review.date,
        content: review.content,
        profileImage: "", // 목 데이터에는 프로필 이미지가 없으므로 빈 문자열
        images: review.images,
    };
}

export function convertToUserReview(
    review: ReviewWithAdminReply & {
        productId: number;
        productName: string;
        productThumbnail: string;
    },
): UserReview {
    return {
        id: review.reviewId?.toString() || "",
        reviewId: review.reviewId,
        productId: review.productId,
        productName: review.productName,
        productThumbnail: review.productThumbnail,
        rating: review.rating,
        content: review.content,
        createdAt: review.createdAt,
        adminReply: review.adminReply,
    };
}
