"use client";

import { useState, useEffect } from "react";
import { useChatNotificationContext } from "./ChatNotificationProvider";
import ChatDialog from "./ChatDialog";

interface ChatButtonProps {
    productInfo?: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
    isFloating?: boolean;
}

const ChatButton = ({ productInfo, isFloating = false }: ChatButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { hasUnreadMessages, hasUnreadForProduct, checkUnreadMessages } = useChatNotificationContext();

    // 제품별로 읽지 않은 메시지 확인 (현재는 전역 상태 사용)
    const currentHasUnread = productInfo?.id 
        ? hasUnreadForProduct(productInfo.id) 
        : hasUnreadMessages;

    // 알림 상태 변화 감지
    useEffect(() => {
        console.log('ChatButton 알림 상태 변화:', {
            hasUnreadMessages,
            currentHasUnread,
            productId: productInfo?.id,
            isFloating
        });
    }, [hasUnreadMessages, currentHasUnread]);

    const handleOpen = () => {
        setIsOpen(true);
        // 채팅창을 열면 즉시 알림 상태를 다시 확인하여 업데이트
        setTimeout(() => checkUnreadMessages(), 100);
    };
    
    const handleClose = () => setIsOpen(false);

    if (isFloating) {
        // 플로팅 버튼 스타일 (화면 우하단)
        return (
            <>
                <button
                    type="button"
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-[#257A57] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#1f6347] transition-colors z-40 relative"
                    aria-label="채팅 열기"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>채팅 아이콘</title>
                        <path
                            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
                            fill="currentColor"
                        />
                        <circle cx="12" cy="10" r="1" fill="currentColor" />
                        <circle cx="8" cy="10" r="1" fill="currentColor" />
                        <circle cx="16" cy="10" r="1" fill="currentColor" />
                    </svg>
                    
                    {currentHasUnread && (
                        <div className="absolute -top-1 -right-1">
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                            <div className="w-4 h-4 bg-red-600 rounded-full absolute top-0 left-0"></div>
                        </div>
                    )}
                </button>

                {isOpen && <ChatDialog onClose={handleClose} productInfo={productInfo} />}
            </>
        );
    }

    // Header용 일반 버튼 스타일
    return (
        <>
            <button onClick={handleOpen} aria-label="채팅 상담" className="cursor-pointer relative" type="button">
                <div className="w-8 h-8 flex items-center justify-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="chatIconTitle"
                    >
                        <title id="chatIconTitle">채팅 상담</title>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 13.92 2.55 15.75 3.43 17.24C3.58 17.5 3.56 17.82 3.38 18.06L2.4 19.31C2.2 19.57 2.33 19.95 2.65 20.04C4.85 20.65 7.21 20.03 9 18.56C9.95 18.86 10.97 19 12 19C17.52 19 22 14.52 22 9C22 3.48 17.52 2 12 2ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5ZM16 11.5C15.17 11.5 14.5 10.83 14.5 10C14.5 9.17 15.17 8.5 16 8.5C16.83 8.5 17.5 9.17 17.5 10C17.5 10.83 16.83 11.5 16 11.5Z"
                            fill="black"
                        />
                    </svg>
                </div>
                
                {currentHasUnread && (
                    <div className="absolute -top-1 -right-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <div className="w-3 h-3 bg-red-600 rounded-full absolute top-0 left-0"></div>
                    </div>
                )}
            </button>

            {isOpen && <ChatDialog onClose={handleClose} productInfo={productInfo} />}
        </>
    );
};

export default ChatButton;
