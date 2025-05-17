import { fetchServer } from "@/src/shared/fetcher";
import { getMockProduct, getMockReviews, getMockReviewStats, getMockRecommendedProducts } from "@/src/features/product/mocks/productMock";
import type { ProductType, ReviewType, RecommendedProductType } from "@/src/features/product/types";

/**
 * 제품 정보가 없을 때 반환할 기본 제품 정보
 */
const emptyProduct: ProductType = {
    id: 0,
    title: "제품 정보를 찾을 수 없습니다",
    description: "요청하신 제품 정보를 찾을 수 없습니다.",
    price: 0,
    pricePerUnit: "",
    images: [],
    tags: [],
    badges: [],
    inStock: false,
    coffeeSize: "",
    aromaFeatures: [],
    bodyLevel: 0,
    bitterLevel: 0,
    acidLevel: 0,
    roastLevel: 0,
    quantity: 0,
    limitDescription: "",
    additionalDescription: "",
    productDetails: {
        detailText: "",
    },
};

/**
 * 제품 상세 정보를 가져오는 API 함수
 */
export async function getProduct(id: string): Promise<ProductType> {
    try {
        const fetch = fetchServer();
        const response = await fetch<ProductType>(`/api/products/${id}`);
        if (response.data === null) {
            console.error(`제품 정보를 찾을 수 없습니다 (id: ${id})`);
            // 개발 환경에서는 목 데이터로 폴백
            if (process.env.NODE_ENV === "development") {
                console.log(`===== [개발기] 제품 정보 없음, 목 데이터로 폴백 (id: ${id}) ======`);
                return getMockProduct(id);
            }
            return emptyProduct;
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`제품 정보 조회 실패 (id: ${id}):`, error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log(`===== [개발기] API 실패로 제품 목 데이터로 폴백 (id: ${id}) ======`);
            return getMockProduct(id);
        }

        // 프로덕션에서는 빈 제품 정보 반환
        return emptyProduct;
    }
}

/**
 * 제품 리뷰를 가져오는 API 함수
 */
export async function getProductReviews(productId: string): Promise<ReviewType[]> {
    try {
        const fetch = fetchServer();
        const response = await fetch<ReviewType[]>(`/api/products/${productId}/reviews`);
        if (response.data === null) {
            return [];
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`제품 리뷰 조회 실패 (productId: ${productId}):`, error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log(`===== [개발기] API 실패로 리뷰 목 데이터로 폴백 (productId: ${productId}) ======`);
            return getMockReviews(productId);
        }

        return [];
    }
}

type ReviewStats = {
    totalRating: number;
    ratingCounts: number[];
};

/**
 * 제품 리뷰 통계를 가져오는 API 함수
 */
export async function getProductReviewStats(productId: string): Promise<ReviewStats> {
    try {
        const fetch = fetchServer();
        const response = await fetch<ReviewStats>(`/api/products/${productId}/review-stats`);
        if (response.data === null) {
            console.error(`리뷰 통계 정보를 찾을 수 없습니다 (productId: ${productId})`);
            // 개발 환경에서는 목 데이터로 폴백
            if (process.env.NODE_ENV === "development") {
                console.log(`===== [개발기] 리뷰 통계 정보 없음, 목 데이터로 폴백 (productId: ${productId}) ======`);
                return getMockReviewStats(productId);
            }
            return {
                totalRating: 0,
                ratingCounts: [0, 0, 0, 0, 0],
            };
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`리뷰 통계 조회 실패 (productId: ${productId}):`, error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log(`===== [개발기] API 실패로 리뷰 통계 목 데이터로 폴백 (productId: ${productId}) ======`);
            return getMockReviewStats(productId);
        }

        // 기본 통계 값 반환
        return {
            totalRating: 0,
            ratingCounts: [0, 0, 0, 0, 0],
        };
    }
}

/**
 * 추천 제품 목록을 가져오는 API 함수
 */
export async function getRecommendedProducts(productId: string): Promise<RecommendedProductType[]> {
    try {
        const fetch = fetchServer();
        const response = await fetch<RecommendedProductType[]>(`/api/products/${productId}/recommendations`);
        if (response.data === null) {
            return [];
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`추천 제품 조회 실패 (productId: ${productId}):`, error);

        // 개발 환경에서는 API 실패 시 목 데이터로 폴백
        if (process.env.NODE_ENV === "development") {
            console.log(`===== [개발기] API 실패로 추천 제품 목 데이터로 폴백 (productId: ${productId}) ======`);
            return getMockRecommendedProducts(productId);
        }

        return [];
    }
}
