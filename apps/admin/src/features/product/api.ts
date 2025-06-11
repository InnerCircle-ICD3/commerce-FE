import { del, get, post, put } from '@/shared/kyInstance';
import type { PaginationParams, PageResponse } from '@/shared/types';

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
  return get<PageResponse<Product>>('products', params);
}

// 상품 상세 조회
export async function getProductById(id: number): Promise<Product> {
  return get<Product>(`products/${id}`);
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
    isSoldOut
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

// 상품 생성
export async function createProduct(productData: CreateProductDto): Promise<{ productId: number }> {
  const response = await post<{ data: { productId: number } }>('admin/products', productData);
  return response.data;
}

// 상품 정보 업데이트
export async function updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
  return put<Product>(`admin/products/${id}`, productData);
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

// 강도 카테고리 목록 조회
export async function getIntensities(): Promise<Intensity[]> {
  return get<Intensity[]>('admin/categories/intensities');
}

// 컵 사이즈 카테고리 목록 조회
export async function getCupSizes(): Promise<CupSize[]> {
  return get<CupSize[]>('admin/categories/cup-sizes');
}
