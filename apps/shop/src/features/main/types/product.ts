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
    id?: string;
    image: string;
    title: string;
    description: string;
};

export type RegularProduct = {
    type: "product";
    badges: Badge[];
    image: string;
    features: Feature[];
    name: string;
    description: string;
    price: number;
    unit: string;
    outOfStock?: boolean;
};

export type ProductType = BannerProduct | RegularProduct;
