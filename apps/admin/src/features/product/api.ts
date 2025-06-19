import { del, get, post, put } from "@/shared/kyInstance";
import type { PageResponse, PaginationParams } from "@/shared/types";
import { logger } from "@/shared/utils/logger";

// 상품 정보 타입 정의
export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number; // 재고 (API 응답에서는 quantity로 제공)
    thumbnail: string;
    detailImage: string;
    intensity: string;
    cupSize: string;
    isSoldOut: boolean; // 판매 상태 (API 응답에서는 isSoldOut으로 제공)
    createdAt?: string;
    updatedAt?: string;
}

// 상품 목록 조회 API 요청 파라미터
export interface ProductListParams extends PaginationParams {
    isSoldOut?: boolean; // 품절 상태 필터
}

// 상품 API 함수들

// 상품 목록 조회
export async function getProducts(params: ProductListParams = {}): Promise<PageResponse<Product>> {
    return get<PageResponse<Product>>("admin/products", params);
}

// 상품 상세 조회
export async function getProductById(id: number): Promise<Product> {
    return get<Product>(`admin/products/${id}`);
}

// 상품 삭제
export async function deleteProduct(id: number): Promise<void> {
    await del<void>(`admin/products/${id}`);
}

// 상품 상태 변경 (품절/판매중)
export async function updateProductStatus(id: number, isSoldOut: boolean): Promise<void> {
    const product = await getProductById(id);
    await put<void>(`admin/products/${id}`, {
        ...product,
        isSoldOut,
    });
}

// 상품 생성을 위한 인터페이스
export interface CreateProductDto {
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    detailImage: string;
    intensityId: number;
    cupSizeId: number;
}

// 상품 수정을 위한 인터페이스 (백엔드 API 스펙에 맞춤)
export interface UpdateProductDto {
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    detailImage: string;
    intensityId: number;
    cupSizeId: number;
    status: "ON_SALE" | "UNAVAILABLE"; // 백엔드 SellingStatus enum
}

// 관리자 상품 상세 조회용 인터페이스 (백엔드 응답 형식)
export interface AdminProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    detailImage: string;
    intensity: string;
    cupSize: string;
    status: "ON_SALE" | "UNAVAILABLE";
}

// 상품 생성
export async function createProduct(productData: CreateProductDto): Promise<{ productId: number }> {
    const response = await post<{ data: { productId: number } }>("admin/products", productData);
    return response.data;
}

// 관리자 상품 상세 조회 (수정용)
export async function getAdminProductById(id: number): Promise<AdminProduct> {
    const response = await get<AdminProduct>(`admin/products/${id}`);
    logger.debug("Admin product API response:", response);

    if (!response) {
        throw new Error("상품 정보를 찾을 수 없습니다.");
    }

    return response;
}

// 상품 수정
export async function updateProduct(id: number, productData: UpdateProductDto): Promise<{ productId: number }> {
    const response = await put<{ data: { productId: number } }>(`admin/products/${id}`, productData);
    return response.data;
}

// 커피 강도 카테고리 타입
export interface Intensity {
    id: number;
    name: string;
}

// 컵 사이즈 카테고리 타입
export interface CupSize {
    id: number;
    name: string;
}

// 카테고리 응답 타입
export interface CategoryResponse {
    cupSizes: Array<{ id: string; label: string }>;
    intensities: Array<{ id: string; label: string }>;
}

// 카테고리 데이터를 캐시하기 위한 변수
let categoriesCache: CategoryResponse | null = null;

// 카테고리 목록 조회 (한 번의 API 호출로 모든 카테고리 가져오기)
async function getCategories(): Promise<CategoryResponse> {
    if (!categoriesCache) {
        categoriesCache = await get<CategoryResponse>("products/categories");
    }
    return categoriesCache;
}

// 강도 카테고리 목록 조회
export async function getIntensities(): Promise<Intensity[]> {
    const categories = await getCategories();
    return categories.intensities.map(item => ({
        id: Number(item.id),
        name: item.label,
    }));
}

// 컵 사이즈 카테고리 목록 조회
export async function getCupSizes(): Promise<CupSize[]> {
    const categories = await getCategories();
    return categories.cupSizes.map(item => ({
        id: Number(item.id),
        name: item.label,
    }));
}

// 별칭 함수들 (기존 코드 호환성)
export const getAllCupSizes = getCupSizes;
export const getAllIntensities = getIntensities;
