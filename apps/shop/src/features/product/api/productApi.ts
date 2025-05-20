import { fetchData } from "@/src/shared/utils/api";
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
    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockProduct(id);

    return fetchData({
        endpoint: `/products/${id}`, // 제품 상세 조회 API 주소
        defaultValue: emptyProduct, // 실패 시 반환할 기본값
        mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}

/**
 * 제품 리뷰를 가져오는 API 함수
 */
export async function getProductReviews(productId: string): Promise<ReviewType[]> {
    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockReviews(productId);

    return fetchData({
        endpoint: `/products/${productId}/reviews`, // 제품 리뷰 조회 API 주소
        defaultValue: [], // 실패 시 반환할 기본값
        mockDataFn: mockFn, // 개발기 환경에서 API 실패 시 호출할 목 데이터 생성 함수 (발표 끝나고 백엔드 서버가 폭파되면 이걸 대신 띄워야 함)
    });
}

type ReviewStats = {
    totalRating: number;
    ratingCounts: number[];
};

/**
 * 제품 리뷰 통계를 가져오는 API 함수
 */
export async function getProductReviewStats(productId: string): Promise<ReviewStats> {
    const emptyStats: ReviewStats = {
        totalRating: 0,
        ratingCounts: [0, 0, 0, 0, 0],
    };

    // 제품 ID 기반 목 데이터 생성 함수
    const mockFn = () => getMockReviewStats(productId);

    return fetchData({
        endpoint: `/products/${productId}/reviews`, // 리뷰 통계 조회 API 주소
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
