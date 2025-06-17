import type { ProductType, ReviewType, RecommendedProductType } from "@/src/features/product/types";
import type { ReviewResponse } from "@/src/shared/entities/review/types";

// 기존 커피 목 데이터 배열 (스웨거 기준)
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "에스프레소",
        price: 2500,
        quantity: 100,
        thumbnail: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop&crop=center",
        intensity: "Strong",
        cupSize: "Small",
        isSoldOut: false,
    },
    {
        id: 2,
        name: "아메리카노",
        price: 3000,
        quantity: 150,
        thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Large",
        isSoldOut: false,
    },
    {
        id: 3,
        name: "카페라떼",
        price: 4000,
        quantity: 80,
        thumbnail: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Medium",
        isSoldOut: false,
    },
    {
        id: 4,
        name: "카푸치노",
        price: 4200,
        quantity: 120,
        thumbnail: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Medium",
        isSoldOut: false,
    },
    {
        id: 5,
        name: "마키아토",
        price: 4500,
        quantity: 60,
        thumbnail: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&crop=center",
        intensity: "Strong",
        cupSize: "Small",
        isSoldOut: false,
    },
    {
        id: 6,
        name: "바닐라라떼",
        price: 4800,
        quantity: 90,
        thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&crop=center",
        intensity: "Light",
        cupSize: "Large",
        isSoldOut: false,
    },
    {
        id: 7,
        name: "헤이즐넛 라떼",
        price: 5000,
        quantity: 70,
        thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Small",
        isSoldOut: false,
    },
    {
        id: 8,
        name: "아이스아메리카노",
        price: 3200,
        quantity: 85,
        thumbnail: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Large",
        isSoldOut: false,
    },
    {
        id: 9,
        name: "콜드브루",
        price: 3800,
        quantity: 95,
        thumbnail: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&h=400&fit=crop&crop=center",
        intensity: "Strong",
        cupSize: "Medium",
        isSoldOut: false,
    },
    {
        id: 10,
        name: "플랫 화이트",
        price: 3500,
        quantity: 0,
        thumbnail: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop&crop=center",
        detailImage: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop&crop=center",
        intensity: "Medium",
        cupSize: "Large",
        isSoldOut: true,
    },
];

/**
 * 제품 상세 정보 목 데이터를 반환하는 함수
 */
export function getMockProduct(id?: string): ProductType {
    const productId = id ? Number.parseInt(id, 10) : 1;
    const product = MOCK_PRODUCTS.find(p => p.id === productId);

    // 해당 ID 제품이 없으면 에러를 던짐
    if (!product) {
        const error = new Error(`Product with id ${productId} not found`) as Error & { code: string };
        error.code = "PRODUCT_NOT_FOUND";
        throw error;
    }

    return product;
}

// 제품별 리뷰 목 데이터
const PRODUCT_REVIEWS: Record<number, ReviewType[]> = {
    1: [
        // 에스프레소
        {
            reviewId: 1,
            nickname: "에스프레소매니아",
            rating: 5,
            createdAt: "2023-12-15",
            content: "진짜 진한 에스프레소! 크레마가 훌륭해요.",
            adminReply: {
                replyId: 1,
                content: "진한 에스프레소를 좋아해주셔서 감사합니다!",
                createdAt: "2023-12-16",
            },
        },
        {
            reviewId: 2,
            nickname: "아침커피",
            rating: 4,
            createdAt: "2023-12-10",
            content: "아침에 마시기 좋아요. 진한 맛이 하루를 시작하기에 완벽!",
        },
        {
            reviewId: 3,
            nickname: "커피초보",
            rating: 3,
            createdAt: "2023-12-05",
            content: "좀 쓴 편이지만 진짜 에스프레소 맛이네요.",
        },
    ],
    2: [
        // 아메리카노
        {
            reviewId: 4,
            nickname: "아메리카노러버",
            rating: 5,
            createdAt: "2023-12-14",
            content: "깔끔하고 부드러운 아메리카노. 매일 마셔도 질리지 않아요!",
        },
        {
            reviewId: 5,
            nickname: "직장인김씨",
            rating: 4,
            createdAt: "2023-12-12",
            content: "사무실에서 마시기 딱 좋아요. 적당한 쓴맛이 좋습니다.",
            adminReply: {
                replyId: 2,
                content: "업무할 때 도움이 되어 기쁩니다!",
                createdAt: "2023-12-13",
            },
        },
        {
            reviewId: 6,
            nickname: "커피중독자",
            rating: 5,
            createdAt: "2023-12-08",
            content: "하루에 3잔씩 마셔도 부담없어요. 최고!",
        },
    ],
    3: [
        // 카페라떼
        {
            reviewId: 7,
            nickname: "라떼사랑",
            rating: 5,
            createdAt: "2023-12-13",
            content: "부드럽고 크리미한 맛이 일품! 우유와 커피의 조화가 완벽해요.",
        },
        {
            reviewId: 8,
            nickname: "달콤한하루",
            rating: 4,
            createdAt: "2023-12-11",
            content: "달달하면서도 커피 맛이 살아있어요. 디저트랑 같이 마시면 더 좋아요!",
        },
        {
            reviewId: 9,
            nickname: "카페사장",
            rating: 4,
            createdAt: "2023-12-07",
            content: "카페에서 파는 라떼랑 비슷한 맛이에요. 집에서도 카페 기분!",
        },
    ],
    4: [
        // 카푸치노
        {
            reviewId: 10,
            nickname: "카푸치노킹",
            rating: 5,
            createdAt: "2023-12-12",
            content: "거품이 정말 부드러워요! 카푸치노 특유의 맛이 살아있습니다.",
        },
        {
            reviewId: 11,
            nickname: "이탈리아여행자",
            rating: 4,
            createdAt: "2023-12-09",
            content: "이탈리아에서 마신 카푸치노가 생각나네요. 향이 정말 좋아요!",
        },
        {
            reviewId: 12,
            nickname: "폼아트러버",
            rating: 5,
            createdAt: "2023-12-06",
            content: "거품으로 라떼아트 연습하기 좋아요. 맛도 훌륭하고!",
        },
    ],
    5: [
        // 마키아토
        {
            reviewId: 13,
            nickname: "마키아토전문가",
            rating: 5,
            createdAt: "2023-12-11",
            content: "진한 에스프레소에 우유 거품이 조화로워요. 정통 마키아토 맛!",
        },
        {
            reviewId: 14,
            nickname: "커피탐험가",
            rating: 4,
            createdAt: "2023-12-08",
            content: "처음 마셔봤는데 생각보다 맛있네요. 달지 않아서 좋아요.",
        },
        {
            reviewId: 15,
            nickname: "강한커피선호",
            rating: 5,
            createdAt: "2023-12-04",
            content: "강한 커피 맛을 원하는 분들께 추천! 만족스러워요.",
        },
    ],
};

/**
 * 제품 리뷰 목 데이터를 반환하는 함수
 */
export function getMockReviews(page = 0, size = 20, productId?: string): ReviewResponse {
    const id = productId ? Number.parseInt(productId, 10) : 1;

    // 해당 제품이 존재하는지 확인
    const product = MOCK_PRODUCTS.find(p => p.id === id);

    // 제품이 존재하지 않으면 빈 리뷰 반환
    if (!product) {
        return {
            content: [],
            page: page,
            size: size,
            totalPages: 0,
            totalElements: 0,
        };
    }

    // 제품이 존재하면 해당 제품의 리뷰 확인
    const productReviews = PRODUCT_REVIEWS[id];

    // 리뷰가 정의되어 있으면 반환
    if (productReviews) {
        return {
            content: productReviews,
            page: page,
            size: size,
            totalPages: 1,
            totalElements: productReviews.length,
        };
    }

    // 제품은 존재하지만 리뷰가 정의되지 않은 경우 (6번 이상 제품)
    // 기본 리뷰 템플릿 사용
    const productName = product.name;
    const defaultReviews = [
        {
            reviewId: id * 10 + 1,
            nickname: "커피러버",
            rating: 4,
            createdAt: "2023-12-10",
            content: `${productName} 정말 맛있어요! 매일 마시고 싶은 맛입니다.`,
        },
        {
            reviewId: id * 10 + 2,
            nickname: "맛집탐방가",
            rating: 5,
            createdAt: "2023-12-08",
            content: `${productName}는 진짜 맛있네요. 친구들한테도 추천했어요!`,
            adminReply: {
                replyId: id * 10,
                content: "추천해주셔서 감사합니다!",
                createdAt: "2023-12-09",
            },
        },
        {
            reviewId: id * 10 + 3,
            nickname: "일상커피",
            rating: 4,
            createdAt: "2023-12-05",
            content: `${productName} 향이 정말 좋아요. 기분이 좋아집니다.`,
        },
    ];

    return {
        content: [
            {
                reviewId: 1,
                user: {
                    userId: 1,
                    nickname: "커피사랑",
                },
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
                user: {
                    userId: 2,
                    nickname: "여름커피",
                },
                rating: 5,
                createdAt: "2023-02-15",
                content: "시즌 한정이라 아쉽지만 매번 구매하는 제품입니다. 열대과일향이 특히 좋아요!",
            },
            {
                reviewId: 3,
                user: {
                    userId: 3,
                    nickname: "하와이커피팬",
                },
                rating: 4,
                createdAt: "2023-03-02",
                content: "하와이 코나는 처음 마셔봤는데 기대 이상이네요. 부드러운 맛이 일품입니다.",
            },
            {
                reviewId: 4,
                user: {
                    userId: 4,
                    nickname: "가성비커피",
                },
                rating: 3,
                createdAt: "2023-03-15",
                content: "품질은 좋지만 가격이 조금 비싼 편입니다. 특별한 날에 마시기 좋아요.",
            },
        ],
        page: page,
        size: size,
        totalPages: 1,
        totalElements: defaultReviews.length,
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
    const id = productId ? Number.parseInt(productId, 10) : 1;

    // 해당 제품이 존재하는지 확인
    const product = MOCK_PRODUCTS.find(p => p.id === id);

    // 제품이 존재하지 않으면 빈 통계 반환
    if (!product) {
        return {
            averageRating: 0,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 0,
                fourStarsCount: 0,
                fiveStarsCount: 0,
            },
        };
    }

    // 제품별로 다른 통계 반환
    const statsMap: Record<number, ReviewStats> = {
        1: {
            // 에스프레소
            averageRating: 4.0,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 1,
                fourStarsCount: 1,
                fiveStarsCount: 1,
            },
        },
        2: {
            // 아메리카노
            averageRating: 4.7,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 0,
                fourStarsCount: 1,
                fiveStarsCount: 2,
            },
        },
        3: {
            // 카페라떼
            averageRating: 4.3,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 0,
                fourStarsCount: 2,
                fiveStarsCount: 1,
            },
        },
        4: {
            // 카푸치노
            averageRating: 4.7,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 0,
                fourStarsCount: 1,
                fiveStarsCount: 2,
            },
        },
        5: {
            // 마키아토
            averageRating: 4.7,
            ratingDistribution: {
                oneStarCount: 0,
                twoStarsCount: 0,
                threeStarsCount: 0,
                fourStarsCount: 1,
                fiveStarsCount: 2,
            },
        },
    };

    // 기본 통계 (6번 이상 제품용)
    const defaultStats: ReviewStats = {
        averageRating: 4.5,
        ratingDistribution: {
            oneStarCount: 0,
            twoStarsCount: 1,
            threeStarsCount: 2,
            fourStarsCount: 5,
            fiveStarsCount: 12,
        },
    };

    return statsMap[id] || defaultStats;
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
