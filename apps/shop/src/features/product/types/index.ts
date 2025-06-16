// 공통 ReviewType을 shared/entities에서 가져옴
export type { ReviewType } from "@/src/shared/entities/review/types";

export interface ProductType {
    id: number;
    name: string;
    price: number;
    detailImage: string;
    intensity: number;
    quantity: number;
    thumbnail: string;
    cupSize: string;
}

export interface ProductDetails {
    detailText: string;
}

export interface RecommendedProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    stockQuantity: number;
}

export interface ProductCategoryType {
    id: number;
    label: string;
}
