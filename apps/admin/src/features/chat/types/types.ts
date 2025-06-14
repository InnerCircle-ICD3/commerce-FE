export interface ChatResponse {
    chats: Chat[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface Chat {
    roomId: number;
    chatContent: ChatContent[];
    user: {
        nickname: string;
        userId: number;
    };
    createdAt: string;
    product?: {
        productId: number;
        productName: string;
    };
}

export interface ChatContent {
    userType: unknown; // 실제 타입으로 변경 필요
    content: string;
    createdAt: string;
}
