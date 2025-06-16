import type { UserReviewResponse } from "@/src/features/myReviews/types";

/**
 * 사용자 리뷰 목 데이터를 반환하는 함수
 */
export function getMockUserReviews(page = 0, size = 10): UserReviewResponse {
    return {
        content: [
            {
                reviewId: 1,
                product: {
                    productId: 1,
                    productName: "스페셜 리저브 하와이 코나",
                    productThumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
                },
                rating: 5,
                content: "정말 향이 좋고 맛있어요! 매일 마시고 있습니다. 이국적인 열대 과일향이 정말 독특하고 매력적이에요.",
                createdAt: "2024-03-15T10:30:00",
                adminReply: {
                    replyId: 1,
                    content: "소중한 리뷰 감사합니다! 하와이 코나의 특별한 풍미를 즐겨주셔서 기쁩니다.",
                    createdAt: "2024-03-16T09:00:00",
                    updatedAt: "2024-03-16T09:00:00",
                },
            },
            {
                reviewId: 2,
                product: {
                    productId: 2,
                    productName: "에어로치노4",
                    productThumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
                },
                rating: 4,
                content: "가격은 비싸지만 품질이 정말 좋네요. 밀크 폼이 부드럽고 크리미해서 만족합니다.",
                createdAt: "2024-03-10T15:20:00",
            },
            {
                reviewId: 3,
                product: {
                    productId: 3,
                    productName: "버츄오 머그 컵 세트 스몰",
                    productThumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
                },
                rating: 5,
                content: "사이즈가 딱 적당하고 디자인도 예뻐요. 커피 맛이 더 좋아진 것 같습니다.",
                createdAt: "2024-03-05T08:45:00",
                adminReply: {
                    replyId: 2,
                    content: "아름다운 디자인을 칭찬해주셔서 감사합니다! 계속해서 좋은 커피 경험을 제공하겠습니다.",
                    createdAt: "2024-03-06T10:15:00",
                    updatedAt: "2024-03-06T10:15:00",
                },
            },
            {
                reviewId: 4,
                product: {
                    productId: 4,
                    productName: "바리스타 카푸치노 컵 세트",
                    productThumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
                },
                rating: 4,
                content: "품질은 좋지만 생각보다 작네요. 그래도 커피샵 느낌이 나서 만족합니다.",
                createdAt: "2024-02-28T14:30:00",
            },
            {
                reviewId: 5,
                product: {
                    productId: 5,
                    productName: "라이브스톡 브라질 원두",
                    productThumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c7bfa7b14aca451340208bfc07390f055298c80",
                },
                rating: 3,
                content: "평범한 맛이에요. 나쁘지는 않지만 특별함은 없습니다.",
                createdAt: "2024-02-20T11:15:00",
                adminReply: {
                    replyId: 3,
                    content: "소중한 의견 감사합니다. 더 좋은 제품으로 보답하겠습니다.",
                    createdAt: "2024-02-21T09:30:00",
                    updatedAt: "2024-02-21T09:30:00",
                },
            },
        ],
        page: page,
        size: size,
        totalPages: 1,
        totalElements: 5,
    };
}
