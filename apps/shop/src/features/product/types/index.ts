// 공통 ReviewType을 shared/entities에서 가져옴
export type { ReviewType } from "@/src/shared/entities/review/types";

export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    pricePerUnit?: string;
    images: string[];
    tags: string[];
    badges: Array<{
        text: string;
        bgColor: string;
        textColor?: string;
    }>;
    inStock: boolean;
    coffeeSize?: string;
    aromaFeatures?: string[];
    bodyLevel?: number;
    bitterLevel?: number;
    acidLevel?: number;
    roastLevel?: number;
    quantity?: number;
    limitDescription?: string;
    additionalDescription?: string;
    productDetails?: ProductDetails;
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
    inStock: boolean;
}

export interface ProductCategoryType {
    id: number;
    label: string;
}
