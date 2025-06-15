"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/src/lib/supabase";
import { getUserId } from "@/src/lib/userId";
import type { RealtimeChannel } from "@supabase/supabase-js";

// 로컬스토리지 키 상수
const CHAT_STORAGE_KEY = "chat_rooms_history";
const LAST_READ_KEY = "chat_last_read";

// 채팅방 정보 타입
interface ChatRoomInfo {
    roomId: string;
    productId?: string;
    lastMessageId?: string;
    lastReadAt: string;
}

// 로컬스토리지 관리 함수들
const getChatHistory = (): ChatRoomInfo[] => {
    try {
        const stored = localStorage.getItem(CHAT_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveChatHistory = (history: ChatRoomInfo[]) => {
    try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error("채팅 히스토리 저장 오류:", error);
    }
};

const getLastReadMessageId = (roomId: string): string | null => {
    try {
        const stored = localStorage.getItem(`${LAST_READ_KEY}_${roomId}`);
        return stored;
    } catch {
        return null;
    }
};

const saveLastReadMessageId = (roomId: string, messageId: string) => {
    try {
        localStorage.setItem(`${LAST_READ_KEY}_${roomId}`, messageId);
    } catch (error) {
        console.error("마지막 읽은 메시지 저장 오류:", error);
    }
};

export const useChatNotifications = () => {
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [userId, setUserId] = useState<string>("");
    const [isInitialized, setIsInitialized] = useState(false);
    const [subscriptions, setSubscriptions] = useState<RealtimeChannel[]>([]);
    const [openChatRoom, setOpenChatRoom] = useState<string | null>(null); // 현재 열린 채팅방 ID

    // openChatRoom의 현재 값을 항상 추적하기 위한 ref
    const openChatRoomRef = useRef<string | null>(null);

    // openChatRoom 상태가 변경될 때마다 ref 업데이트
    useEffect(() => {
        openChatRoomRef.current = openChatRoom;
        console.log("openChatRoomRef 업데이트:", openChatRoom);
    }, [openChatRoom]);

    // console.log('📊 useChatNotifications 상태:', { hasUnreadMessages, userId, isInitialized });

    // 사용자 ID 초기화 - 즉시 설정
    useEffect(() => {
        const storedUserId = getUserId();
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // 채팅방에 새 메시지 추가 시 히스토리 업데이트
    const addToHistory = useCallback((roomId: string, productId?: string) => {
        try {
            const history = getChatHistory();
            const existing = history.find(room => room.roomId === roomId);

            if (!existing) {
                const newRoom: ChatRoomInfo = {
                    roomId,
                    productId,
                    lastReadAt: new Date().toISOString(),
                };
                history.push(newRoom);
                saveChatHistory(history);
            }
        } catch (error) {
            console.error("❌ addToHistory 오류:", error);
        }
    }, []);

    // 채팅방 열기
    const setChatRoomOpen = useCallback((roomId: string) => {
        try {
            console.log("🔓 채팅방 열림:", roomId);
            setOpenChatRoom(roomId);
        } catch (error) {
            console.error("❌ setChatRoomOpen 오류:", error);
        }
    }, []);

    // 채팅방 닫기
    const setChatRoomClosed = useCallback(() => {
        try {
            setOpenChatRoom(prev => {
                console.log("🔒 openChatRoom 상태 변경:", prev, "→ null");
                return null;
            });
        } catch (error) {
            console.error("❌ setChatRoomClosed 오류:", error);
        }
    }, []);

    // 특정 제품의 읽지 않은 메시지 확인
    const hasUnreadForProduct = useCallback(
        (productId?: string): boolean => {
            // 여기서는 전역 상태만 반환, 개별 제품별로는 나중에 필요시 구현
            return hasUnreadMessages;
        },
        [hasUnreadMessages],
    );

    // 읽지 않은 메시지 확인
    const checkUnreadMessages = useCallback(async () => {
        if (!userId) return;

        try {
            const history = getChatHistory();
            if (history.length === 0) {
                setHasUnreadMessages(false);
                return;
            }

            let hasUnread = false;

            // 각 채팅방에서 읽지 않은 메시지 확인
            for (const roomInfo of history) {
                const lastReadMessageId = getLastReadMessageId(roomInfo.roomId);

                // 마지막 읽은 메시지 이후의 관리자 메시지 확인
                const query = supabase
                    .from("chat_messages")
                    .select("id, created_at")
                    .eq("room_id", roomInfo.roomId)
                    .eq("is_admin", true)
                    .order("created_at", { ascending: false })
                    .limit(1);

                const { data: latestMessages } = await query;

                if (latestMessages && latestMessages.length > 0) {
                    const latestMessage = latestMessages[0];

                    // 마지막 읽은 메시지 이후에 새로운 관리자 메시지가 있는지 확인
                    if (!lastReadMessageId || latestMessage.id !== lastReadMessageId) {
                        // 마지막 읽은 시간 이후의 메시지인지 확인
                        const lastReadTime = roomInfo.lastReadAt;
                        if (new Date(latestMessage.created_at) > new Date(lastReadTime)) {
                            hasUnread = true;
                            break;
                        }
                    }
                }
            }

            setHasUnreadMessages(hasUnread);
        } catch (error) {
            console.error("읽지 않은 메시지 확인 오류:", error);
        }
    }, [userId]);

    // 메시지를 읽음으로 표시
    const markAsRead = useCallback(
        (roomId: string, messageId?: string) => {
            if (messageId) {
                saveLastReadMessageId(roomId, messageId);
            }

            // 해당 채팅방의 읽지 않은 상태 업데이트
            const history = getChatHistory();
            const updated = history.map(room => (room.roomId === roomId ? { ...room, lastReadAt: new Date().toISOString() } : room));
            saveChatHistory(updated);

            // 전체 읽지 않은 메시지 상태 다시 확인
            checkUnreadMessages();
        },
        [checkUnreadMessages],
    );

    // 실시간 구독 설정
    const setupRealtimeSubscriptions = useCallback(() => {
        if (!userId) {
            console.log("사용자 ID가 없어서 실시간 구독 설정 불가");
            return;
        }

        console.log("실시간 구독 설정 시작:", userId);

        // 기존 구독 정리
        setSubscriptions(prevSubs => {
            console.log("기존 구독 정리:", prevSubs.length, "개");
            for (const sub of prevSubs) {
                console.log("🔌 구독 해제:", sub.topic);
                sub.unsubscribe();
            }
            return [];
        });

        // 전역 메시지 구독 - 필터 없이 모든 메시지를 수신한 후 필터링
        const messageSubscription = supabase
            .channel("global_chat_notifications:" + userId)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_messages",
                },
                async payload => {
                    console.log("새로운 메시지 수신:", payload.new);
                    const newMessage = payload.new;

                    // 관리자 메시지가 아니면 무시
                    if (!newMessage.is_admin) {
                        console.log("사용자 메시지이므로 무시");
                        return;
                    }

                    console.log("관리자 메시지 확인됨, 채팅방 확인 중...", {
                        messageId: newMessage.id,
                        roomId: newMessage.room_id,
                        currentUserId: userId,
                    });

                    // 해당 메시지가 현재 사용자의 채팅방인지 확인
                    const { data: room, error: roomError } = await supabase
                        .from("chat_rooms")
                        .select("id, user_id, product_info")
                        .eq("id", newMessage.room_id)
                        .maybeSingle();

                    if (roomError) {
                        console.error("채팅방 확인 오류:", {
                            error: roomError,
                            message: roomError.message,
                            details: roomError.details,
                            hint: roomError.hint,
                            code: roomError.code,
                            roomId: newMessage.room_id,
                        });
                        return;
                    }

                    console.log("채팅방 정보:", room);

                    if (room && room.user_id === userId) {
                        console.log("✅ 내 채팅방의 메시지임");

                        // 채팅방 히스토리에 추가 (없는 경우)
                        const productId = room.product_info?.id;
                        addToHistory(newMessage.room_id, productId);

                        // 현재 openChatRoom 상태를 실시간으로 확인
                        const currentOpenRoom = openChatRoomRef.current;
                        console.log("현재 열린 채팅방 상태 확인:", {
                            currentOpenRoom,
                            newMessageRoomId: newMessage.room_id,
                            isMatching: currentOpenRoom === newMessage.room_id,
                        });

                        // 채팅창이 열려있는지 확인
                        if (currentOpenRoom === newMessage.room_id) {
                            console.log("채팅창이 열려있음 - 메시지 자동 읽음 처리");
                            // 채팅창이 열려있으면 자동으로 읽음 처리
                            supabase
                                .from("chat_messages")
                                .update({ is_read_by_user: true })
                                .eq("id", newMessage.id)
                                .then(({ error: updateError }) => {
                                    if (updateError) {
                                        console.error("실시간 메시지 읽음 상태 업데이트 오류:", updateError);
                                    } else {
                                        markAsRead(newMessage.room_id, newMessage.id);
                                    }
                                });
                        } else {
                            console.log("채팅창이 닫혀있음 - 알림 표시");
                            // 채팅창이 닫혀있으면 알림 표시
                            setHasUnreadMessages(prev => {
                                console.log("알림 상태 변경:", prev, "→ true");
                                return true;
                            });
                        }

                        console.log("✅ 메시지 처리 완료");
                    } else {
                        console.log("❌ 다른 사용자의 채팅방 메시지", {
                            roomUserId: room?.user_id,
                            currentUserId: userId,
                            match: room?.user_id === userId,
                        });
                    }
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "chat_messages",
                    filter: `is_admin=eq.true`,
                },
                () => {
                    // 메시지 읽음 상태 업데이트 시 다시 확인
                    checkUnreadMessages();
                },
            )
            .subscribe(status => {
                console.log("실시간 구독 상태:", status);
                if (status === "CLOSED") {
                    console.log("🔌 전역 실시간 구독 해제됨");
                }
            });

        console.log("📡 새로운 구독 설정:", messageSubscription.topic);
        setSubscriptions([messageSubscription]);
    }, [userId, checkUnreadMessages, addToHistory, markAsRead]);

    // 초기화 및 자동 연결
    useEffect(() => {
        console.log("=== 초기화 useEffect 실행 ===", {
            userId: userId ? `${userId.substring(0, 8)}...` : "null",
            isInitialized,
            조건체크: !userId ? "사용자ID없음" : isInitialized ? "이미초기화됨" : "초기화진행",
        });

        if (!userId) {
            console.log("사용자 ID가 없어서 초기화 대기 중");
            return;
        }

        if (isInitialized) {
            console.log("이미 초기화됨");
            return;
        }

        console.log("🚀 채팅 알림 시스템 초기화 시작:", `${userId.substring(0, 8)}...`);
        const history = getChatHistory();

        console.log(`사용자 ID: ${userId.substring(0, 8)}..., 채팅 이력: ${history.length}개`);

        // 채팅 이력이 있으면 읽지 않은 메시지 확인
        if (history.length > 0) {
            console.log(`채팅 이력이 있습니다. 자동 연결 시작 (${history.length}개 채팅방)`);
            checkUnreadMessages();
        }

        // 채팅 이력이 있든 없든 실시간 구독은 항상 시작
        // (새로운 채팅방이 생성될 수 있기 때문)
        console.log(">>> 실시간 구독 설정 호출");
        setupRealtimeSubscriptions();

        setIsInitialized(true);
        console.log("✅ 채팅 알림 시스템 초기화 완료");
    }, [userId, isInitialized, checkUnreadMessages, setupRealtimeSubscriptions]);

    // 정리
    useEffect(() => {
        return () => {
            console.log("🧹 컴포넌트 언마운트 - 모든 구독 해제:", subscriptions.length, "개");
            for (const sub of subscriptions) {
                console.log("🔌 구독 해제 (정리):", sub.topic);
                sub.unsubscribe();
            }
        };
    }, [subscriptions]);

    // 알림을 즉시 해제하는 함수
    const clearNotifications = useCallback(() => {
        console.log("알림 상태 즉시 해제");
        setHasUnreadMessages(false);
    }, []);

    return {
        hasUnreadMessages,
        hasUnreadForProduct,
        addToHistory,
        markAsRead,
        checkUnreadMessages,
        clearNotifications,
        setupRealtimeSubscriptions,
        isInitialized,
        openChatRoom: setChatRoomOpen,
        closeChatRoom: setChatRoomClosed,
        currentOpenRoom: openChatRoom,
    };
};
