export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    pricePerUnit: string;
    images: string[];
    tags: string[];
    badges: {
        text: string;
        bgColor: string;
        textColor?: string;
    }[];
    inStock: boolean;
    coffeeSize: string;
    aromaFeatures: string[];
    bodyLevel: number;
    bitterLevel: number;
    acidLevel: number;
    roastLevel: number;
    quantity: number;
    limitDescription: string;
    additionalDescription: string;
    // 제품 상세 정보
    productDetails?: ProductDetails;
}

export interface ProductDetails {
    foodType: string;
    origin: string;
    expiryInfo: string;
    volume: string;
    ingredients: string;
    returnPolicy: string;
    storageMethod: string;
    packaging: string;
    notices: string[];
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
