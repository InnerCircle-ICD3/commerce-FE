import type { OrderHistoryItem } from "@/src/features/order/types/orderHistory";

// 목 데이터 함수
export const getMockOrderHistory = (): OrderHistoryItem[] => {
    return [
        {
            id: "1",
            status: "준비중",
            productName: "스페셜 리저브 하와이 코나 외 3건",
            price: 35000,
            imageSrc: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069",
        },
        {
            id: "2",
            status: "배송중",
            productName: "스페셜 리저브 하와이 코나 외 3건",
            price: 35000,
            imageSrc: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070",
        },
        {
            id: "3",
            status: "배송완료",
            statusDate: "5/11 도착",
            productName: "스페셜 리저브 하와이 코나 외 3건",
            price: 35000,
            imageSrc: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1887",
        },
        {
            id: "4",
            status: "반품완료",
            statusDate: "5/11 취소",
            productName: "스페셜 리저브 하와이 코나 외 3건",
            price: 35000,
            imageSrc: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?q=80&w=1887",
        },
    ];
};
