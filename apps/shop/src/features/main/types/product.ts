export type BadgeVariant = "default" | "yellow" | "purple" | "red" | "green";

export type Badge = {
    text: string;
    variant: BadgeVariant;
};

export type Feature = {
    icon?: string;
    value: string;
    label?: string;
    strength?: number;
};

export type BannerProduct = {
    type: "banner";
    image: string;
    title: string;
    description: string;
};

// API 응답 타입 (백엔드에서 오는 데이터)
export type ApiProduct = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    detailImage: string;
    intensity: string;
    cupSize: string;
    isSoldOut: boolean;
};

// 기존 UI 컴포넌트용 타입 (기존 컴포넌트와 호환성 유지)
export type RegularProduct = {
    productId: number;
    type: "product";
    badges: Badge[];
    image: string;
    features: Feature[];
    name: string;
    description: string;
    price: number;
    unit: string;
    outOfStock?: boolean;
    stockQuantity: number;
};

export type ProductType = BannerProduct | RegularProduct;
