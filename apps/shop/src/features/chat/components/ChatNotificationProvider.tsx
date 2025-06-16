"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useChatNotifications } from "../hooks/useChatNotifications";

// Context 타입 정의
interface ChatNotificationContextType {
    hasUnreadMessages: boolean;
    hasUnreadForProduct: (productId?: string) => boolean;
    addToHistory: (roomId: string, productId?: string) => void;
    markAsRead: (roomId: string, messageId?: string) => void;
    checkUnreadMessages: () => Promise<void>;
    clearNotifications: () => void;
    setupRealtimeSubscriptions: () => void;
    isInitialized: boolean;
    openChatRoom: (roomId: string) => void;
    closeChatRoom: () => void;
    currentOpenRoom: string | null;
}

// Context 생성
const ChatNotificationContext = createContext<ChatNotificationContextType | null>(null);

// Provider 컴포넌트
export function ChatNotificationProvider({ children }: { children: ReactNode }) {
    // console.log("ChatNotificationProvider 마운트됨");

    try {
        // console.log("useChatNotifications 호출 시도...");
        const chatNotifications = useChatNotifications();
        // console.log("useChatNotifications 호출 성공:", chatNotifications);

        // 컨텍스트 값을 메모이제이션하여 불필요한 리렌더링 방지
        const contextValue = useMemo(() => chatNotifications, [chatNotifications]);

        return <ChatNotificationContext.Provider value={contextValue}>{children}</ChatNotificationContext.Provider>;
    } catch (error) {
        console.error("ChatNotificationProvider 오류:", error);
        throw error;
    }
}

// Hook으로 Context 사용
export function useChatNotificationContext() {
    const context = useContext(ChatNotificationContext);
    if (!context) {
        throw new Error("useChatNotificationContext must be used within ChatNotificationProvider");
    }
    return context;
}
