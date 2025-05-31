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

export interface ReviewType {
    id: number;
    userName: string;
    rating: number;
    date: string;
    content: string;
    images?: string[];
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
