export interface AdminReply {
    content: string;
    createdAt: string;
}

export interface Review {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    adminReply?: AdminReply | null;
    product: {
        productId: number;
        productName: string;
    };
    user: {
        userId: string;
        nickname: string;
    };
}

export interface ReviewData {
    content: Review[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}
