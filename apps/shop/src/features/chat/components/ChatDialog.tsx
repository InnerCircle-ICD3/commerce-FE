"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/lib/supabase";
import type { ChatMessage, ChatRoom, ProductInfo } from "@/lib/supabase";

interface ChatDialogProps {
    onClose: () => void;
    productInfo?: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
}

export interface Message {
    id: string;
    sender: string; 
    message: string;
    timestamp: string;
    type: 'user' | 'system' | 'received'; 
}

const ChatDialog = ({ onClose, productInfo }: ChatDialogProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>(uuidv4()); // 임시 사용자 ID (전체 UUID 사용)
    const cleanupRef = useRef<(() => void) | null>(null); // 정리 함수를 저장할 ref

    // Supabase를 통한 채팅방 생성 또는 참여
    const initChatRoom = useCallback(async (): Promise<() => void> => {
        try {
            let existingRoom: ChatRoom | null = null;
            const productData = productInfo ? {
                id: productInfo.id,
                title: productInfo.title,
                price: productInfo.price,
                image: productInfo.image
            } : null;

            // 1. Check for existing room
            if (productInfo?.id) {
                const { data, error: fetchError } = await supabase
                    .from('chat_rooms')
                    .select('*')
                    .eq('user_id', userId)
                    .eq('product_info->>id', productInfo.id) // Compare text value of product_info.id
                    .maybeSingle();
                if (fetchError) {
                    console.warn('Error fetching existing room for product:', fetchError.message);
                }
                existingRoom = data;
            } else if (!productInfo) { // General inquiry, productInfo is null
                const { data, error: fetchError } = await supabase
                    .from('chat_rooms')
                    .select('*')
                    .eq('user_id', userId)
                    .is('product_info', null)
                    .maybeSingle();
                if (fetchError) {
                    console.warn('Error fetching existing general room:', fetchError.message);
                }
                existingRoom = data;
            }

            let currentRoomIdToUse: string;
            let initialMessages: Message[] = [];

            if (existingRoom) {
                currentRoomIdToUse = existingRoom.id;
                setRoomId(currentRoomIdToUse); 
                // console.log(`Found existing room: ${currentRoomIdToUse}`);
                const { data: existingMessagesData, error: messagesError } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('room_id', currentRoomIdToUse)
                    .order('created_at', { ascending: true });

                if (messagesError) {
                    console.error('Error fetching existing messages:', messagesError);
                } else if (existingMessagesData) {
                    initialMessages = existingMessagesData.map(msg => ({
                        id: msg.id,
                        sender: msg.sender_id,
                        message: msg.message,
                        timestamp: msg.created_at,
                        type: msg.is_admin ? 'system' : (msg.sender_id === userId ? 'user' : 'system')
                    }));
                }
                if (initialMessages.length === 0) { 
                     const welcomeMessage: Message = {
                        id: uuidv4(),
                        sender: '시스템',
                        message: '다시 오신 것을 환영합니다! 무엇을 도와드릴까요?',
                        timestamp: new Date().toISOString(),
                        type: 'system'
                    };
                    initialMessages.push(welcomeMessage);
                }
            } else {
                // console.log('No existing room found, creating a new one.');
                const { data: newRoom, error: insertError } = await supabase
                    .from('chat_rooms')
                    .insert({ user_id: userId, product_info: productData })
                    .select()
                    .single();

                if (insertError) {
                    console.error('Error inserting new chat room:', insertError);
                    setIsConnected(false);
                    throw insertError;
                }
                currentRoomIdToUse = newRoom.id;
                setRoomId(currentRoomIdToUse);

                const welcomeMessage: Message = {
                    id: uuidv4(),
                    sender: '시스템',
                    message: '안녕하세요! 무엇을 도와드릴까요?',
                    timestamp: new Date().toISOString(),
                    type: 'system'
                };
                initialMessages = [welcomeMessage];
            }
            
            setMessages(initialMessages);
            setIsConnected(true);
            
            // Supabase Realtime 구독 설정
            const channel = supabase.channel(`room:${currentRoomIdToUse}`);
            const subscription = channel
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `room_id=eq.${currentRoomIdToUse}`
                }, (payload) => {
                    const newChatMessage = payload.new as ChatMessage;
                    console.log('[Shop ChatDialog] Realtime: Received raw message:', JSON.stringify(newChatMessage, null, 2));
                    console.log(`[Shop ChatDialog] Realtime: newMsg.sender_id=${newChatMessage.sender_id}, current userId=${userId}, newMsg.is_admin=${newChatMessage.is_admin}`);

                    // 내가 보낸 메시지는 Optimistic Update로 이미 처리되었으므로, 여기서는 타인이 보낸 메시지만 처리
                    // 또는 is_admin 플래그가 true인 경우 (관리자가 보낸 메시지)
                    if (newChatMessage.sender_id !== userId) {
                        // is_admin이 true이면 'system' (관리자 메시지)
                        // sender_id가 userId와 다르고 is_admin이 false이면 'received' (다른 사용자 메시지 - 현재는 해당 없음)
                        const messageType: Message['type'] = newChatMessage.is_admin ? 'system' : 'received';

                        const newMessage: Message = {
                            id: newChatMessage.id,
                            sender: newChatMessage.sender_id, // 관리자 ID 또는 다른 사용자 ID
                            message: newChatMessage.message,
                            timestamp: newChatMessage.created_at,
                            type: messageType
                        };
                        console.log('[Shop ChatDialog] Realtime: newMessage object to add:', JSON.stringify(newMessage, null, 2));
                        
                        setMessages(prevMessages => {
                            // 중복 방지: 이미 메시지 목록에 같은 ID의 메시지가 있는지 확인
                            if (prevMessages.some(msg => msg.id === newMessage.id)) {
                                console.log(`[Shop ChatDialog] Realtime: Duplicate message ID ${newMessage.id} detected. Not adding.`);
                                return prevMessages;
                            }
                            const updatedMessages = [...prevMessages, newMessage];
                            console.log('[Shop ChatDialog] Realtime: Messages updated. Count:', updatedMessages.length);
                            return updatedMessages;
                        });
                        scrollToBottom();
                    } else {
                        console.log('[Shop ChatDialog] Realtime: Message from self, already handled by optimistic update or not applicable.');
                    }
                })
                .subscribe((status, err) => {
                    if (status === 'SUBSCRIBED') {
                        console.log(`Successfully subscribed to room channel! Room ID: ${currentRoomIdToUse}`);
                    }
                    if (status === 'CHANNEL_ERROR') {
                        console.error(`Subscription failed! Channel error for room ID: ${currentRoomIdToUse}`, err);
                    }
                    if (status === 'TIMED_OUT') {
                        console.error(`Subscription timed out for room ID: ${currentRoomIdToUse}`);
                    }
                    if (err) {
                        console.error(`Subscription error for room ID: ${currentRoomIdToUse}`, err);
                    }
                });
                            
            return () => {
                console.log(`Unsubscribing from room channel. Room ID: ${currentRoomIdToUse}`);
                if (subscription) channel.unsubscribe(); // Use channel.unsubscribe()
            };
            
        } catch (error) {
            console.error('Error in initChatRoom:', error);
            setIsConnected(false);
            return () => {}; // Return an empty cleanup function on error
        }
    }, [userId, productInfo]);

    // 메시지 전송
    const sendMessage = async () => {
        if (!message.trim() || !isConnected || !roomId) return;

        // 화면에 즉시 메시지 표시
        const msgId = uuidv4();
        const newMessage: Message = {
            id: msgId,
            sender: userId,
            message: message.trim(),
            timestamp: new Date().toISOString(),
            type: 'user'
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage("");
        scrollToBottom();

        try {
            // Supabase에 메시지 저장
            await supabase
                .from('chat_messages')
                .insert({
                    id: msgId,
                    room_id: roomId,
                    sender_id: userId,
                    message: message.trim(),
                    is_admin: false
                });
        } catch (error) {
            console.error('메시지 전송 오류:', error);
        }
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

    // 컴포넌트 마운트 시 Supabase 연결 초기화
    useEffect(() => {
        const initialize = async () => {
            const cleanupFunction = await initChatRoom();
            if (typeof cleanupFunction === 'function') {
                cleanupRef.current = cleanupFunction;
            }
        };

        initialize();

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, [initChatRoom]);

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
