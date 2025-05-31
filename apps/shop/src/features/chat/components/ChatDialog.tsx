"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ChatDialogProps {
    onClose: () => void;
    productInfo?: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
}

interface Message {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    type: "user" | "system";
}

const ChatDialog = ({ onClose, productInfo }: ChatDialogProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

    const connectWebSocket = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        wsRef.current = new WebSocket("ws://localhost:8080");

        wsRef.current.onopen = () => {
            console.log("WebSocket 연결됨");
            setIsConnected(true);

            // 연결되면 자동으로 채팅 시작
            wsRef.current?.send(
                JSON.stringify({
                    type: "join",
                    data: { userName: "고객", userType: "customer" },
                }),
            );
        };

        wsRef.current.onclose = event => {
            console.log("WebSocket 연결 해제됨", event);
            setIsConnected(false);

            // 기존 타이머 제거
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }

            // 3초 후 재연결 시도
            reconnectTimerRef.current = setTimeout(() => {
                if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
                    console.log("재연결 시도 중...");
                    connectWebSocket();
                }
            }, 3000);
        };

        wsRef.current.onerror = error => {
            console.error("WebSocket 오류:", error);
            setIsConnected(false);
        };

        wsRef.current.onmessage = event => {
            try {
                const response = JSON.parse(event.data);
                console.log("서버 응답:", response);

                if (response.type === "message") {
                    const messageData = response.data;
                    const newMessage: Message = {
                        id: messageData.id,
                        sender: messageData.sender,
                        message: messageData.message,
                        timestamp: messageData.timestamp,
                        type: messageData.type,
                    };

                    setMessages(prev => [...prev, newMessage]);
                    scrollToBottom();
                }
            } catch (error) {
                console.error("메시지 파싱 오류:", error);
            }
        };
    }, []);

    // 메시지 전송
    const sendMessage = () => {
        if (!message.trim() || !isConnected) return;

        // 서버로 전송만 하고, 즉시 화면에 표시하지 않음 (서버로부터 받은 후 표시)
        wsRef.current?.send(
            JSON.stringify({
                type: "sendMessage",
                data: { message: message.trim() },
            }),
        );

        setMessage("");
    };

    // 스크롤을 최하단으로
    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    // Enter 키로 메시지 전송
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // 컴포넌트 마운트 시 WebSocket 연결
    useEffect(() => {
        connectWebSocket();

        // cleanup 함수
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
        };
    }, [connectWebSocket]);

    return (
        <div className="fixed top-0 right-0 z-50 flex items-end justify-end p-4 sm:p-6 md:p-8" onClick={e => e.stopPropagation()}>
            <div
                className="w-full sm:w-[22rem] md:w-[26rem] lg:w-[30rem] h-[90vh] max-h-[42rem] bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
                aria-modal="true"
                aria-labelledby="chatTitle"
                onClick={e => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="w-full h-[4.5rem] border-b border-[#EEEEEE] flex items-center justify-between px-6">
                    <div className="flex items-center py-2">
                        <h2 id="chatTitle" className="text-xl font-bold">
                            채팅
                        </h2>
                        <span className={`ml-2 text-sm ${isConnected ? "text-green-600" : "text-red-600"}`}>
                            {isConnected ? "● 연결됨" : "● 연결 중..."}
                        </span>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center" type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="닫기">
                            <title>닫기</title>
                            <path
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </div>

                {/* 채팅 내용 */}
                <div className="flex-grow overflow-y-auto p-4 sm:p-6">
                    {/* 날짜 표시 */}
                    <div className="flex justify-center my-6">
                        <span className="text-xs text-[#666668]">{new Date().toLocaleDateString()}</span>
                    </div>

                    {/* 상품 정보 */}
                    <div className="w-full mb-8">
                        {/* 상품 정보 */}
                        <div className="mb-4">
                            <div className="bg-[#F7F7F8] p-4 rounded-xl border border-[#EEEEEE] mb-1">
                                <div className="flex gap-4">
                                    {/* 상품 이미지 */}
                                    <div className="w-[4.5rem] sm:w-[5rem] h-[3.5rem] relative overflow-hidden">
                                        <img
                                            src={
                                                productInfo?.image ||
                                                "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=200&auto=format&fit=crop"
                                            }
                                            alt={productInfo?.title ? `${productInfo.title} 이미지` : "커피 제품 이미지"}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>

                                    {/* 상품 정보 */}
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="font-bold text-base leading-[1.4] whitespace-pre-line">
                                                {productInfo?.title || "801 프리미엄 블렌드\n커피 캡슐"}
                                            </h3>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-[#257A57] font-bold">
                                                <span>₩</span>
                                                <span>{productInfo?.price?.toLocaleString() || "11,500"}</span>
                                            </div>
                                            <div className="text-xs text-[#37383C] text-opacity-60">10 캡슐</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 버튼 그룹 */}
                            <div className="flex gap-1 mb-2">
                                <button
                                    type="button"
                                    className="flex-1 bg-[#F4F4F5] text-[#2E2F33] text-opacity-88 rounded-lg px-4 py-2.5 font-medium text-sm sm:text-base"
                                >
                                    일반문의
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-[#257A57] text-white rounded-lg px-4 py-2.5 font-bold text-sm sm:text-base"
                                >
                                    해당 제품 문의
                                </button>
                            </div>
                            <div className="text-xs text-[#37383C] text-opacity-60">오후 {new Date().toLocaleTimeString().slice(2, 7)}</div>
                        </div>
                    </div>

                    {/* 실시간 채팅 메시지들 */}
                    {messages.map(msg => (
                        <div key={msg.id} className="mb-4">
                            {msg.type === "system" ? (
                                // 상담사 메시지 (왼쪽)
                                <div>
                                    <div className="bg-[#F7F7F8] text-[#171719] px-4 py-3 rounded-lg inline-block mb-1">{msg.message}</div>
                                    <div className="text-xs text-[#37383C] text-opacity-60">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                                </div>
                            ) : (
                                // 내 메시지 (오른쪽)
                                <div className="flex justify-end">
                                    <div>
                                        <div className="bg-[#257A57] text-white px-4 py-3 rounded-lg inline-block mb-1">{msg.message}</div>
                                        <div className="text-xs text-[#37383C] text-opacity-60 text-right">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>

                {/* 메시지 입력 영역 */}
                <div className="w-full border-t border-[#EEEEEE] p-4">
                    <div className="flex">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isConnected ? "채팅을 입력하세요" : "서버 연결 중..."}
                                aria-label="채팅 메시지 입력"
                                className="w-full h-12 pl-4 pr-10 border border-[#EEEEEE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#257A57]"
                                disabled={!isConnected}
                            />
                        </div>
                        <button
                            type="button"
                            className="ml-2 w-12 h-12 flex items-center justify-center text-[#257A57] disabled:opacity-50"
                            onClick={sendMessage}
                            disabled={!isConnected || !message.trim()}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="전송">
                                <title>전송</title>
                                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="#257A57" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDialog;
