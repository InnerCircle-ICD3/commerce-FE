import { ADMIN_ID, type ChatMessage, type ChatRoom, supabase } from "@/lib/supabase";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface ChatConversationProps {
    room: ChatRoom | null;
}

// 메시지 아이템 컴포넌트 - 불필요한 리랜더링 방지를 위해 분리
const MessageItem = memo(({ message: msg }: { message: ChatMessage }) => (
    <div className={`mb-4 ${msg.is_admin ? "text-right" : "text-left"}`}>
        <div className={`inline-block px-4 py-3 rounded-lg max-w-[80%] ${msg.is_admin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
            <p>{msg.message}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</div>
    </div>
));

export default function ChatConversation({ room }: ChatConversationProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 채팅 메시지 관리를 위한 상태
    const lastMessageRef = useRef<string | null>(null); // 가장 최근에 보낸 메시지 ID

    // 채팅방이 변경되면 메시지를 로드
    useEffect(() => {
        if (!room) return;

        // 초기화
        lastMessageRef.current = null;

        // 이 관리자를 현재 채팅방의 관리자로 설정
        const updateRoomAdmin = async () => {
            try {
                await supabase.from("chat_rooms").update({ admin_id: ADMIN_ID }).eq("id", room.id);
            } catch (error) {
                console.error("관리자 설정 오류:", error);
            }
        };

        // 채팅 메시지 로드
        const fetchMessages = async () => {
            try {
                setLoading(true);

                // 채팅 메시지를 시간순으로 가져옴
                const { data, error } = await supabase
                    .from("chat_messages")
                    .select("*")
                    .eq("room_id", room.id)
                    .order("created_at", { ascending: true });

                if (error) throw error;

                const loadedMessages = data as ChatMessage[];
                // 메시지가 있으면 가장 최근 메시지 기록
                if (loadedMessages.length > 0) {
                    lastMessageRef.current = loadedMessages[loadedMessages.length - 1].id;
                }

                setMessages(loadedMessages);

                // 관리자가 채팅방을 열었을 때, 사용자가 보낸 모든 메시지의 is_read_by_admin을 TRUE로 업데이트
                const unreadUserMessages = loadedMessages.filter(msg => !msg.is_admin && !msg.is_read_by_admin);

                if (unreadUserMessages.length > 0) {
                    const { error: updateError } = await supabase
                        .from("chat_messages")
                        .update({ is_read_by_admin: true })
                        .in(
                            "id",
                            unreadUserMessages.map(msg => msg.id),
                        );

                    if (updateError) {
                        console.error("메시지 읽음 상태 업데이트 오류:", updateError);
                    }
                }

                // 스크롤을 최신 메시지로 이동
                setTimeout(() => scrollToBottom(), 100);
            } catch (error) {
                console.error("메시지 로드 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        updateRoomAdmin();
        fetchMessages();

        // 실시간 메시지 구독 설정
        const subscription = supabase
            .channel(`room-${room.id}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_messages",
                    filter: `room_id=eq.${room.id}`,
                },
                payload => {
                    // 새 메시지 수신 시 처리
                    const newMessage = payload.new as ChatMessage;

                    // 새 메시지 처리 - 부드럽게 추가
                    console.log("[Admin ChatConversation] 실시간 메시지 수신:", newMessage.id);

                    // 함수형 업데이트를 사용하여 이전 상태(prev)를 기반으로 중복을 확인하고 상태를 업데이트합니다.
                    // 이렇게 하면 useEffect의 의존성 배열에 'messages'를 추가할 필요가 없습니다.
                    setMessages(prev => {
                        if (prev.some(msg => msg.id === newMessage.id)) {
                            return prev;
                        }
                        return [...prev, newMessage];
                    });

                    // 새 메시지가 사용자로부터 온 것이고, 관리자가 아직 읽지 않았다면 is_read_by_admin을 TRUE로 업데이트
                    if (!newMessage.is_admin && !newMessage.is_read_by_admin) {
                        supabase
                            .from("chat_messages")
                            .update({ is_read_by_admin: true })
                            .eq("id", newMessage.id)
                            .then(({ error: updateError }) => {
                                if (updateError) {
                                    console.error("실시간 메시지 읽음 상태 업데이트 오류:", updateError);
                                }
                            });
                    }

                    // 당장 스크롤하지 않고 마지막 상태 업데이트 후 한번만 스크롤
                    requestAnimationFrame(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }));
                },
            )
            .subscribe();

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
            subscription.unsubscribe();
        };
    }, [room]); // room 의존성 추가

    // 메시지 전송 함수 - 낙관적 UI 사용하지 않고 서버 응답 후 처리
    const sendMessage = async () => {
        if (!message.trim() || !room) return;

        // 입력창 초기화 및 전송 상태 설정
        const messageText = message.trim();
        setMessage("");
        setSendingMessage(true);

        try {
            // 현재 시간 생성 (ISO 형식)
            const currentTime = new Date().toISOString();
            console.log("[Admin ChatConversation] Sending message to room:", room.id);

            // 메시지 객체 생성
            const newMessageId = uuidv4();
            const newMessage = {
                id: newMessageId,
                room_id: room.id,
                sender_id: ADMIN_ID,
                message: messageText,
                is_admin: true,
                created_at: currentTime,
            };

            // 콘솔에 전송할 메시지 데이터 로깅
            console.log("[Admin ChatConversation] Message payload:", JSON.stringify(newMessage, null, 2));

            // Supabase에 메시지 저장
            const { data: insertData, error: insertError } = await supabase
                .from("chat_messages")
                .insert([newMessage]) // 배열로 감싸서 전달
                .select();

            if (insertError) {
                console.error("[Admin ChatConversation] Supabase insert error:", {
                    message: insertError.message,
                    details: insertError.details,
                    hint: insertError.hint,
                    code: insertError.code,
                });

                alert(`메시지 전송에 실패했습니다: ${insertError.message}`);
                return;
            }

            console.log("[Admin ChatConversation] Message sent successfully:", insertData);

            // 가장 최근 보낸 메시지 ID 저장
            lastMessageRef.current = newMessageId;

            // 채팅방 업데이트 시간 갱신
            const { error: roomUpdateError } = await supabase.from("chat_rooms").update({ updated_at: new Date().toISOString() }).eq("id", room.id);

            if (roomUpdateError) {
                console.error("[Admin ChatConversation] Supabase room update error:", {
                    message: roomUpdateError.message,
                    details: roomUpdateError.details,
                    hint: roomUpdateError.hint,
                    code: roomUpdateError.code,
                });
            }
        } catch (e: unknown) {
            console.error("[Admin ChatConversation] General sendMessage error:", e);

            let errorMessage = "메시지 전송 중 오류가 발생했습니다.";
            if (e instanceof Error) {
                errorMessage = `메시지 전송 중 오류가 발생했습니다: ${e.message}`;
            }

            alert(errorMessage);
        } finally {
            // 송신 상태 해제
            setSendingMessage(false);
        }
    };

    // Enter 키로 메시지 전송
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // 스크롤을 최하단으로 이동 - useCallback으로 최적화
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    if (!room) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500">
                <p>좌측에서 채팅을 선택해 주세요.</p>
            </div>
        );
    }

    // 제품 정보 추출
    const product = room.product_info;
    const hasProduct = product && Object.keys(product).length > 0;

    return (
        <div className="flex flex-col h-[calc(100vh-150px)] bg-white rounded-lg shadow overflow-hidden">
            {/* 채팅방 헤더 */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-gray-800">{hasProduct ? `${product.title} 문의` : "일반 문의"}</h2>
                    <p className="text-xs text-gray-500">고객 ID: {room.user_id.substring(0, 8)}...</p>
                </div>

                {/* 제품 정보가 있는 경우 표시 */}
                {hasProduct && (
                    <div className="flex items-center text-sm bg-gray-50 p-2 rounded">
                        <div className="w-10 h-10 rounded overflow-hidden mr-2">
                            {product.image ? (
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span>상품</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">{product.title}</p>
                            <p className="text-gray-500">{product.price.toLocaleString()}원</p>
                        </div>
                    </div>
                )}
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 p-4 overflow-y-auto">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <p>아직 메시지가 없습니다.</p>
                    </div>
                ) : (
                    <>
                        {messages.map(msg => (
                            <MessageItem key={msg.id} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* 메시지 입력 영역 */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={sendMessage}
                        disabled={!message.trim() || sendingMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                        {sendingMessage ? "전송 중..." : "전송"}
                    </button>
                </div>
            </div>
        </div>
    );
}
