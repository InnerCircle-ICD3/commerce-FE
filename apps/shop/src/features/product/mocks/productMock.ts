import type { ProductType, ReviewType, RecommendedProductType } from "@/src/features/product/types";
import type { ReviewResponse } from "@/src/shared/entities/review/types";

/**
 * 제품 상세 정보 목 데이터를 반환하는 함수
 */
export function getMockProduct(id?: string): ProductType {
    // id를 활용하여 다른 제품 반환 로직을 추가할 수 있음
    return {
        id: 1,
        name: "스페셜 리저브 하와이 코나",
        price: 35000,
        detailImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        intensity: 4,
        quantity: 100,
        thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
        cupSize: "미디엄",
    };
}

/**
 * 제품 리뷰 목 데이터를 반환하는 함수
 */
export function getMockReviews(page = 0, size = 20): ReviewResponse {
    // productId를 활용하여 다른 리뷰 반환 로직을 추가할 수 있음
    return {
        content: [
            {
                reviewId: 1,
                nickname: "커피러버",
                rating: 4,
                createdAt: "2023-01-24",
                content: "향이 정말 좋고 산미가 적절해요. 아침에 마시기 좋은 커피입니다.",
                adminReply: {
                    replyId: 1,
                    content: "감사합니다! 앞으로도 좋은 커피로 보답하겠습니다.",
                    createdAt: "2025-05-25",
                },
            },
            {
                reviewId: 2,
                nickname: "여름커피",
                rating: 5,
                createdAt: "2023-02-15",
                content: "시즌 한정이라 아쉽지만 매번 구매하는 제품입니다. 열대과일향이 특히 좋아요!",
            },
            {
                reviewId: 3,
                nickname: "하와이팬",
                rating: 4,
                createdAt: "2023-03-02",
                content: "하와이 코나는 처음 마셔봤는데 기대 이상이네요. 부드러운 맛이 일품입니다.",
                images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80"],
            },
            {
                reviewId: 4,
                nickname: "커피매니아",
                rating: 3,
                createdAt: "2023-03-15",
                content: "품질은 좋지만 가격이 조금 비싼 편입니다. 특별한 날에 마시기 좋아요.",
            },
        ],
        page: page,
        size: size,
        totalPages: 1,
        totalElements: 4,
    };
}

export type ReviewStats = {
    averageRating: number;
    totalCount?: number;
    ratingDistribution: {
        oneStarCount: number;
        twoStarsCount: number;
        threeStarsCount: number;
        fourStarsCount: number;
        fiveStarsCount: number;
    };
};

/**
 * 제품 리뷰 통계 목 데이터를 반환하는 함수
 */
export function getMockReviewStats(productId?: string): ReviewStats {
    // productId를 활용하여 다른 통계 반환 로직을 추가할 수 있음
    return {
        averageRating: 4.6,
        ratingDistribution: {
            oneStarCount: 1,
            twoStarsCount: 3,
            threeStarsCount: 11,
            fourStarsCount: 33,
            fiveStarsCount: 100,
        },
    };
}

/**
 * 추천 제품 목 데이터를 반환하는 함수
 */
export function getMockRecommendedProducts(productId?: string): RecommendedProductType[] {
    // productId를 활용하여 다른 추천 제품 반환 로직을 추가할 수 있음
    return [
        {
            id: 1,
            title: "에어로치노4",
            description: "최상의 밀크 레시피로 당신의 커피 경험을 업그레이드 해보세요",
            price: 149000,
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
            stockQuantity: 100,
        },
        {
            id: 2,
            title: "버츄오 머그 컵 세트 스몰",
            description: "넉넉한 용량의 버츄오 머그",
            price: 39000,
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
            stockQuantity: 50,
        },
        {
            id: 3,
            title: "바리스타 카푸치노 컵 세트, 미디엄",
            description: "당신의 커피 경험을 업그레이드 시켜줄 바리스타 컬렉션",
            price: 32000,
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
            stockQuantity: 0,
        },
    ];
}
