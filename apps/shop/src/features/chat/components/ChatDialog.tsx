"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/src/lib/supabase";
import type { ChatMessage as SupabaseChatMessage } from "@/src/lib/supabase";
import { getUserId } from "@/src/lib/userId";
import { useChatNotificationContext } from "./ChatNotificationProvider";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface ChatDialogProps {
    onClose: () => void;
    productInfo?: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
}

interface Message extends SupabaseChatMessage {
    type: 'user' | 'system' | 'received';
}

const ChatDialog = ({ onClose, productInfo: initialProductInfo }: ChatDialogProps) => {
    const [userId, setUserId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inquiryType, setInquiryType] = useState<'product' | 'general' | null>(initialProductInfo ? null : 'general');
    const [productInfo, setProductInfo] = useState(initialProductInfo);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const channelRef = useRef<RealtimeChannel | null>(null);
    
    // 전역 채팅 알림 관리
    const { addToHistory, markAsRead, openChatRoom, closeChatRoom } = useChatNotificationContext();

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {
            dialogElement.showModal();
            dialogElement.addEventListener('close', onClose);
        }
        return () => {
            if (dialogElement) {
                dialogElement.removeEventListener('close', onClose);
            }
        };
    }, [onClose]);

    useEffect(() => {
        const storedUserId = getUserId();
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("User ID not found, chat cannot initialize.");
            setIsLoading(false);
        }
    }, []);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (messages.length) {
            requestAnimationFrame(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }));
        }
    }, [messages]);

    const handleInquiryTypeSelect = (type: 'product' | 'general') => {
        if (type === 'general') {
            setProductInfo(undefined);
        }
        setInquiryType(type);
    };

    // 개별 채팅방 실시간 구독 설정
    const setupRoomSubscription = useCallback((roomId: string) => {
        console.log(`[ChatDialog] 채팅방 ${roomId} 실시간 구독 설정 중...`);
        
        // 기존 구독이 있다면 정리
        if (channelRef.current) {
            console.log(`[ChatDialog] 기존 구독 정리 중...`);
            supabase.removeChannel(channelRef.current);
            channelRef.current = null;
        }

        // 새로운 구독 설정
        const channel = supabase
            .channel(`chat_room_${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `room_id=eq.${roomId}`,
                },
                (payload) => {
                    console.log(`[ChatDialog] 새 메시지 수신:`, payload);
                    const newMessage = payload.new as SupabaseChatMessage;
                    
                    const messageWithType: Message = {
                        ...newMessage,
                        type: newMessage.is_admin ? 'received' : (newMessage.sender_id === userId ? 'user' : 'received'),
                    };

                    setMessages(prev => {
                        // 중복 메시지 방지
                        const exists = prev.some(msg => msg.id === newMessage.id);
                        if (exists) {
                            console.log(`[ChatDialog] 중복 메시지 무시: ${newMessage.id}`);
                            return prev;
                        }
                        
                        console.log(`[ChatDialog] 새 메시지 추가: ${newMessage.message}`);
                        return [...prev, messageWithType];
                    });

                    // 관리자 메시지인 경우 자동 읽음 처리 (채팅창이 열려있으므로)
                    if (newMessage.is_admin) {
                        console.log(`[ChatDialog] 관리자 메시지 자동 읽음 처리`);
                        markAsRead(roomId, newMessage.id);
                        
                        // 데이터베이스에서도 읽음 상태 업데이트
                        supabase
                            .from("chat_messages")
                            .update({ is_read_by_user: true })
                            .eq("id", newMessage.id)
                            .then(({ error }) => {
                                if (error) {
                                    console.error("메시지 읽음 상태 업데이트 오류:", error);
                                }
                            });
                    }
                }
            )
            .subscribe((status) => {
                console.log(`[ChatDialog] 구독 상태: ${status}`);
                if (status === 'SUBSCRIBED') {
                    setIsConnected(true);
                } else if (status === 'CLOSED') {
                    setIsConnected(false);
                }
            });

        channelRef.current = channel;
    }, [userId, markAsRead]);

    useEffect(() => {
        if (!userId || !inquiryType) return;

        const initializeChat = async () => {
            setIsLoading(true);
            try {
                const productData = productInfo ? { id: productInfo.id, title: productInfo.title, price: productInfo.price, image: productInfo.image } : null;

                let roomQuery = supabase.from('chat_rooms').select('id').eq('user_id', userId);
                if (productInfo?.id) {
                    roomQuery = roomQuery.eq('product_info->>id', productInfo.id);
                } else {
                    roomQuery = roomQuery.is('product_info', null);
                }

                const { data: existingRoom, error: fetchError } = await roomQuery.maybeSingle();
                if (fetchError) throw fetchError;

                let currentRoomId: string;
                if (existingRoom) {
                    currentRoomId = existingRoom.id;
                    const { data, error } = await supabase.from('chat_messages').select('*').eq('room_id', currentRoomId).order('created_at');
                    if (error) throw error;
                    const initialMessages = data.map((msg): Message => ({
                        id: msg.id,
                        room_id: msg.room_id,
                        sender_id: msg.sender_id,
                        message: msg.message,
                        created_at: msg.created_at,
                        is_admin: msg.is_admin,
                        is_read_by_admin: msg.is_read_by_admin,
                        is_read_by_user: msg.is_read_by_user,
                        type: msg.is_admin ? 'received' : (msg.sender_id === userId ? 'user' : 'received'),
                    }));

                    // 사용자가 채팅방을 열었을 때, 관리자가 보낸 모든 메시지의 is_read_by_user를 TRUE로 업데이트
                    const unreadAdminMessages = initialMessages.filter(
                        (msg) => msg.is_admin && !msg.is_read_by_user
                    );

                    if (unreadAdminMessages.length > 0) {
                        const { error: updateError } = await supabase
                            .from("chat_messages")
                            .update({ is_read_by_user: true })
                            .in(
                                "id",
                                unreadAdminMessages.map((msg) => msg.id)
                            );

                        if (updateError) {
                            console.error("메시지 읽음 상태 업데이트 오류:", updateError);
                        } else {
                            // 채팅창을 열 때 읽지 않은 메시지들을 읽음 처리
                            const lastUnreadMessage = unreadAdminMessages[unreadAdminMessages.length - 1];
                            markAsRead(currentRoomId, lastUnreadMessage.id);
                        }
                    }
                    setMessages(initialMessages.length > 0 ? initialMessages : [{
                        id: uuidv4(),
                        room_id: existingRoom?.id || uuidv4(),
                        sender_id: 'system',
                        message: '무엇을 도와드릴까요?',
                        created_at: new Date().toISOString(),
                        is_admin: true,
                        is_read_by_admin: true,
                        is_read_by_user: false,
                        type: 'system',
                    }]);
                    
                    // 채팅창을 열었으므로 최신 관리자 메시지까지 읽음 처리
                    if (initialMessages.length > 0) {
                        const latestAdminMessage = initialMessages
                            .filter(msg => msg.is_admin)
                            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                        
                        if (latestAdminMessage) {
                            markAsRead(currentRoomId, latestAdminMessage.id);
                        }
                    }
                } else {
                    const { data: newRoom, error: createError } = await supabase
                        .from('chat_rooms')
                        .insert({ user_id: userId, product_info: productData })
                        .select('id')
                        .single();
                    if (createError) throw createError;
                    currentRoomId = newRoom.id;
                    
                    // 새 채팅방을 히스토리에 추가
                    addToHistory(currentRoomId, productInfo?.id);
                    
                    const welcomeMessage = productInfo
                        ? `${productInfo.title}에 대한 문의를 시작합니다.`
                        : '안녕하세요! 무엇을 도와드릴까요?';
                    setMessages([{
                        id: uuidv4(),
                        room_id: newRoom.id,
                        sender_id: 'system',
                        message: welcomeMessage,
                        created_at: new Date().toISOString(),
                        is_admin: true,
                        is_read_by_admin: true,
                        is_read_by_user: false,
                        type: 'system',
                    }]);
                }
                setRoomId(currentRoomId);
                
                // 기존 채팅방의 경우에도 히스토리에 추가 (없을 경우에만)
                if (existingRoom) {
                    addToHistory(currentRoomId, productInfo?.id);
                }

                // 전역 알림 시스템에 채팅방이 열렸음을 알림
                openChatRoom(currentRoomId);

                // 개별 채팅방 실시간 구독 설정
                setupRoomSubscription(currentRoomId);

            } catch (error) {
                console.error("Error initializing chat:", error);
                setMessages([{
                    id: uuidv4(),
                    room_id: uuidv4(),
                    sender_id: 'system',
                    message: '채팅을 시작하는 중 오류가 발생했습니다.',
                    created_at: new Date().toISOString(),
                    is_admin: true,
                    is_read_by_admin: true,
                    is_read_by_user: false,
                    type: 'system',
                }]);
            } finally {
                setIsLoading(false);
            }
        };

        initializeChat();

        // 컴포넌트 언마운트 시 구독 정리
        return () => {
            if (channelRef.current) {
                console.log(`[ChatDialog] 컴포넌트 언마운트 - 구독 정리`);
                supabase.removeChannel(channelRef.current);
                channelRef.current = null;
            }
        };
    }, [userId, inquiryType, productInfo?.id, setupRoomSubscription]);

    const sendMessage = async () => {
        if (!message.trim() || !userId || !roomId) return;

        const messageText = message.trim();
        setMessage(""); // 입력창 즉시 초기화

        try {
            const { error } = await supabase.from('chat_messages').insert({
                room_id: roomId,
                sender_id: userId,
                message: messageText,
            });

            if (error) {
                console.error("Error sending message:", error);
                // 에러 발생 시 사용자에게 알림
                alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
                setMessage(messageText); // 메시지 복원
            }
        } catch (error) {
            console.error("Unexpected error sending message:", error);
            alert("메시지 전송 중 오류가 발생했습니다.");
            setMessage(messageText); // 메시지 복원
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
            event.preventDefault();
            sendMessage();
        }
    };

    const handleCloseClick = () => {
        // 채팅을 닫을 때 현재까지의 마지막 메시지를 읽음으로 표시
        if (roomId && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.is_admin) {
                markAsRead(roomId, lastMessage.id);
            }
        }
        
        // 전역 알림 시스템에 채팅방이 닫혔음을 알림
        closeChatRoom();
        
        // 개별 채팅방 구독 정리 (전역 알림 시스템으로 전환)
        if (channelRef.current) {
            console.log(`[ChatDialog] 채팅창 닫기 - 개별 구독 정리, 전역 알림 시스템으로 전환`);
            supabase.removeChannel(channelRef.current);
            channelRef.current = null;
            // 연결 상태는 유지 (전역 알림 시스템이 작동 중)
            // setIsConnected(false);
        }
        
        // 채팅창 닫기
        dialogRef.current?.close();
        onClose(); // 부모 컴포넌트에 닫힘 상태 알림
    };

    return (
        <dialog ref={dialogRef} className="w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col h-[90vh] p-0 [&::backdrop]:bg-black/50">
            <header className="flex items-center justify-between p-4 border-b border-[#EEEEEE]">
                <h2 className="text-lg font-bold">채팅상담</h2>
                <button type="button" onClick={handleCloseClick} aria-label="닫기" className="text-gray-500 hover:text-gray-800">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>닫기 아이콘</title>
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </header>

            <main className="flex-grow overflow-y-auto p-4 sm:p-6">
                {productInfo && !inquiryType ? (
                    <div className="w-full">
                        <div className="bg-[#F7F7F8] p-4 rounded-xl border border-[#EEEEEE] mb-4">
                            <div className="flex gap-4">
                                <div className="w-[4.5rem] sm:w-[5rem] h-[3.5rem] relative overflow-hidden">
                                    <img src={productInfo.image} alt={productInfo.title} className="w-full h-full object-cover rounded-md" />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="font-bold text-base leading-[1.4] whitespace-pre-line">{productInfo.title}</h3>
                                        <div className="text-xs text-[#37383C] text-opacity-60">{productInfo.price.toLocaleString()}원</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => handleInquiryTypeSelect('general')} className="flex-1 bg-[#F4F4F5] text-[#2E2F33] rounded-lg py-2.5 font-medium">일반문의</button>
                            <button type="button" onClick={() => handleInquiryTypeSelect('product')} className="flex-1 bg-[#257A57] text-white rounded-lg py-2.5 font-bold">해당 제품 문의</button>
                        </div>
                    </div>
                ) : isLoading ? (
                    <div className="flex-grow flex justify-center items-center">채팅방을 불러오는 중입니다...</div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id}>
                                    {msg.type === 'system' && (
                                        <div className="text-center my-2">
                                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{msg.message}</span>
                                        </div>
                                    )}
                                    {msg.type === 'received' && (
                                        <div className="flex justify-start">
                                            <div>
                                                <div className="bg-[#F7F7F8] text-[#171719] px-4 py-3 rounded-lg inline-block mb-1 max-w-xs break-words">{msg.message}</div>
                                                <div className="text-xs text-[#37383C] text-opacity-60">
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {msg.type === 'user' && (
                                        <div className="flex justify-end">
                                            <div>
                                                <div className="bg-[#257A57] text-white px-4 py-3 rounded-lg inline-block mb-1 max-w-xs break-words">{msg.message}</div>
                                                <div className="text-xs text-[#37383C] text-opacity-60 text-right">
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div ref={messagesEndRef} />
                    </>
                )}
            </main>

            {inquiryType && (
                <footer className="w-full border-t border-[#EEEEEE] p-4">
                    <div className="flex items-center">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isConnected ? "메시지를 입력하세요" : "연결 중..."}
                                aria-label="채팅 메시지 입력"
                                className="w-full h-12 pl-4 pr-12 border border-[#EEEEEE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#257A57]"
                                disabled={!isConnected || isLoading}
                            />
                        </div>
                        <button
                            type="button"
                            aria-label="전송"
                            className="ml-2 w-12 h-12 flex items-center justify-center text-[#257A57] disabled:opacity-50"
                            onClick={sendMessage}
                            disabled={!isConnected || !message.trim() || isLoading}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>전송 아이콘</title>
                                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </footer>
            )}
        </dialog>
    );
};

export default ChatDialog;
