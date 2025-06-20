import { queryOptions } from "@tanstack/react-query";
import { deleteProduct, getProductById, getProducts, updateProductStatus, getAdminProductById } from "./api";
import type { Product, ProductListParams } from "./api";

// Product 형식을 프론트엔드용으로 변환
export function mapProductFromApi(apiProduct: Product): Product & { sellingStatus: "SELLING" | "SOLD_OUT"; stock: number } {
    return {
        ...apiProduct,
        sellingStatus: apiProduct.isSoldOut ? "SOLD_OUT" : "SELLING",
        stock: apiProduct.quantity,
    };
}

// 관리자 상품 상세 조회 쿼리 옵션
export const adminProductQueryOptions = (productId: number) =>
    queryOptions({
        queryKey: ["admin-product", productId],
        queryFn: () => getAdminProductById(productId),
    });

// 프론트엔드용 Product에서 API형식으로 변환
export function mapProductToApi(product: Product & { sellingStatus: "SELLING" | "SOLD_OUT"; stock: number }): Product {
    const { sellingStatus, stock, ...rest } = product;
    return {
        ...rest,
        isSoldOut: sellingStatus === "SOLD_OUT",
        quantity: stock,
    };
}

// 페이지 부분을 기존 코드에 맞을 형태로 변환
export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}

// 상품 관련 쿼리 키
export const productQueries = {
    all: () => ["products"],
    lists: () => [...productQueries.all(), "list"],
    list: (params: ProductListParams) => [...productQueries.lists(), params],
    details: () => [...productQueries.all(), "detail"],
    detail: (id: number) => [...productQueries.details(), id],
};

// 상품 목록 조회를 위한 react-query 쿼리 옵션
export const productsQueryOptions = (params: ProductListParams & { sellingStatus?: "SELLING" | "SOLD_OUT" }) =>
    queryOptions({
        queryKey: productQueries.list(params),
        queryFn: async () => {
            const apiParams = {
                ...params,
                // sellingStatus가 있으면 isSoldOut으로 변환 (기존 호환성)
                isSoldOut: params.sellingStatus === "SOLD_OUT" ? true : params.sellingStatus === "SELLING" ? false : params.isSoldOut,
            };

            // sellingStatus는 API 파라미터에서 제거 (백엔드에는 없는 파라미터)
            delete (apiParams as any).sellingStatus;

            // API 응답을 기존 형태로 변환
            const response = await getProducts(apiParams);
            return {
                content: response.content.map(mapProductFromApi),
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                number: response.page,
                size: response.size,
            } as Page<Product & { sellingStatus: "SELLING" | "SOLD_OUT"; stock: number }>;
        },
    });

// 상품 상세 조회를 위한 react-query 쿼리 옵션
export const productDetailQueryOptions = (id: number) =>
    queryOptions({
        queryKey: productQueries.detail(id),
        queryFn: async () => {
            const product = await getProductById(id);
            return mapProductFromApi(product);
        },
    });

// 이미 처리된 삭제 및 상태 변경 함수들은 외부로 내보냄
export { deleteProduct, updateProductStatus };
