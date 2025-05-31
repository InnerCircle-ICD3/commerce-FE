// 주문 상세 페이지 관련 UI 타입들
export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
    imageSrc: string;
}

export interface PaymentItem {
    id: string;
    name: string;
    price: number;
}

export interface ShippingInfo {
    name: string;
    address: string;
    phone: string;
    memo?: string;
}

export interface OrderDetailData {
    orderId: string;
    orderStatus: string;
    orderDate: string;
    products: Product[];
    paymentItems: PaymentItem[];
    shipping: ShippingInfo;
    totalAmount: number;
    discount: number;
}
