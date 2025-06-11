import { get, authGet, authPost, authPut, authDel } from '@/shared/api/client';
import type { PaginationParams, PageResponse } from '@/shared/api/types';

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
  await authDel<void>(`admin/products/${id}`);
}

// 상품 상태 변경 (품절/판매중)
export async function updateProductStatus(id: number, isSoldOut: boolean): Promise<void> {
  const product = await getProductById(id);
  await authPut<void>(`admin/products/${id}`, {
    ...product,
    isSoldOut
  });
}

// 상품 생성
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  return authPost<Product>('admin/products', product);
}

// 상품 정보 업데이트
export async function updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
  return authPut<Product>(`admin/products/${id}`, productData);
}
