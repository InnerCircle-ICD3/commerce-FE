import type { ReviewData } from "@/features/review/types/type";

export const mockReviewData: ReviewData = {
    content: [
        {
            reviewId: 1,
            rating: 5,
            content: "정말 맛있어요! 향이 좋고 산미가 적당해서 매일 마시고 있습니다. 포장도 깔끔하고 배송도 빨라서 만족스러워요.",
            createdAt: "2024-12-15T10:30:00",
            adminReply: {
                content: "좋은 리뷰 감사합니다! 앞으로도 좋은 제품으로 보답하겠습니다.",
                createdAt: "2024-12-15T14:20:00",
            },
            product: {
                productId: 101,
                productName: "에티오피아 예가체프 원두",
            },
            user: {
                userId: "user123",
                nickname: "커피러버",
            },
        },
    ],
    page: 0,
    size: 10,
    totalPages: 5,
    totalElements: 50,
};

export function getMockReviews(): ReviewData {
    return mockReviewData;
}
