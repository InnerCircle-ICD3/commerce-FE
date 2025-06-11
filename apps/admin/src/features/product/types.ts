// 상품 타입 정의
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "inactive";
    updatedAt: string;
}
