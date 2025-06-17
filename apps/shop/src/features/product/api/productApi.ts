import { fetchData } from "@/src/shared/utils/api";
import {
    getMockProduct,
    getMockReviews,
    getMockReviewStats,
    getMockRecommendedProducts,
    type ReviewStats,
} from "@/src/features/product/mocks/productMock";
import type { ProductType, RecommendedProductType } from "@/src/features/product/types";
import type { ReviewResponse } from "@/src/shared/entities/review/types";

// API 응답 타입 정의
interface ApiReviewResponse {
    reviewId: number;
    nickname: string;
    rating: number;
    content: string;
    createdAt: string;
    adminReply: {
        content: string;
        createdAt: string;
        updatedAt: string;
    } | null;
}

/**
 * 제품 정보가 없을 때 반환할 기본 제품 정보
 */
const emptyProduct: ProductType = {
    id: 0,
    name: "제품 정보를 찾을 수 없습니다",
    price: 0,
    quantity: 0,
    thumbnail: "",
    detailImage: "",
    intensity: "Unknown",
    cupSize: "Unknown",
    isSoldOut: true,
};

/**
 * 제품 상세 정보를 가져오는 API 함수
 */
export async function getProduct(id: string): Promise<ProductType> {
    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockProduct(id);

    // 운영 환경 체크 (NODE_ENV가 production이거나 NEXT_PUBLIC_ENV가 production인 경우)
    const isProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENV === "production";

    try {
        if (isProduction) {
            return await fetchData({
                endpoint: `/products/${id}`, // 운영기에서는 실제 백엔드 API 호출
                defaultValue: emptyProduct, // 실패 시 반환할 기본값
                mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
            });
        }

        return await fetchData({
            endpoint: `/products/${id}`, // 개발기에서는 Next.js 목서버 호출
            defaultValue: emptyProduct, // 실패 시 반환할 기본값
            mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
        });
    } catch (error: unknown) {
        // PRODUCT_NOT_FOUND 에러는 다시 던짐
        if (error instanceof Error && "code" in error && (error as { code: string }).code === "PRODUCT_NOT_FOUND") {
            throw error;
        }

        // 다른 에러는 빈 제품으로 처리
        console.error(error);
        return emptyProduct;
    }
}

const emptyReview: ReviewResponse = {
    content: [],
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
};

/**
 * 제품 리뷰를 가져오는 API 함수
 */
export async function getProductReviews(productId: string, page = 0, sort?: string): Promise<ReviewResponse> {
    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockReviews(page, 20, productId);

    // 정렬 파라미터 추가
    const sortParam = sort ? `&sort=${sort}` : "";

    // 운영 환경 체크 (NODE_ENV가 production이거나 NEXT_PUBLIC_ENV가 production인 경우)
    const isProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENV === "production";

    if (isProduction) {
        return fetchData({
            endpoint: `/reviews:byProduct?productId=${productId}&page=${page}${sortParam}`, // 운영기에서는 기존 경로 사용
            defaultValue: emptyReview, // 실패 시 반환할 기본값
            mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
        });
    }

    const data = fetchData({
        endpoint: `/reviews:byProduct?productId=${productId}&page=${page}${sortParam}`, // 제품 리뷰 조회 API 주소
        defaultValue: emptyReview, // 실패 시 반환할 기본값
        mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });

    return data;
}

/**
 * 제품 리뷰 통계를 가져오는 API 함수
 */
export async function getProductReviewStats(productId: string): Promise<ReviewStats> {
    const emptyStats: ReviewStats = {
        averageRating: 0,
        ratingDistribution: {
            oneStarCount: 0,
            twoStarsCount: 0,
            threeStarsCount: 0,
            fourStarsCount: 0,
            fiveStarsCount: 0,
        },
    };

    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockReviewStats(productId);

    // 운영 환경 체크 (NODE_ENV가 production이거나 NEXT_PUBLIC_ENV가 production인 경우)
    const isProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENV === "production";

    if (isProduction) {
        return fetchData({
            endpoint: `/reviews/rating:byProduct?productId=${productId}`, // 운영기에서는 스웨거 기준 경로 사용
            defaultValue: emptyStats, // 실패 시 반환할 기본값
            mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
        });
    }

    return fetchData({
        endpoint: `/reviews/rating/byProduct?productId=${productId}`, // 개발기에서도 동일한 경로 사용
        defaultValue: emptyStats, // 실패 시 반환할 기본값
        mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}

/**
 * 추천 제품 목록을 가져오는 API 함수
 */
export async function getRecommendedProducts(productId: string): Promise<RecommendedProductType[]> {
    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockRecommendedProducts(productId);

    return fetchData({
        endpoint: `/products/${productId}/recommendations`, // 추천 제품 조회 API 주소
        defaultValue: [], // 실패 시 반환할 기본값
        mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}
