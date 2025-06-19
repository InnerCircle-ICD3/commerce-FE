import { supabase } from "@/lib/supabase";
import type { ChatRoom } from "@/lib/supabase";
import { memo, useCallback, useEffect, useState } from "react";

interface ChatListProps {
    onSelectRoom: (room: ChatRoom) => void;
    selectedRoomId: string | null;
}

// 개별 채팅방 항목 컴포넌트 - 불필요한 리랜더링 방지
const ChatRoomItem = memo(
    ({
        room,
        onSelectRoom,
        isSelected,
    }: {
        room: ChatRoom;
        onSelectRoom: (room: ChatRoom) => void;
        isSelected: boolean;
    }) => {
        // 제품 정보 확인 (없으면 기본값 사용)
        const product = room.product_info;
        const hasProduct = product && Object.keys(product).length > 0;

        // 개별 항목 클릭 핸들러
        const handleClick = useCallback(() => {
            onSelectRoom(room);
        }, [onSelectRoom, room]);

        // 리랜더링이 필요한 속성만 추출하여 사용
        const roomTitle = hasProduct ? `${product.title} 문의` : "일반 문의";
        const userId = room.user_id.substring(0, 8);
        const formattedDate = new Date(room.created_at).toLocaleDateString();

        // 마지막 메시지 정보
        const lastMessage = room.last_message_content;
        const isLastMessageAdmin = room.last_message_is_admin;
        const isLastMessageReadByAdmin = room.last_message_is_read_by_admin;

        return (
            <li className="transition-all duration-200 ease-in-out">
                <button
                    type="button"
                    onClick={handleClick}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-all duration-150 ease-in-out ${
                        isSelected ? "bg-gray-100 border-l-4 border-blue-500" : ""
                    }`}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{roomTitle}</p>
                            <p className="text-xs text-gray-500 mt-1">사용자 ID: {userId}...</p>
                            {lastMessage && <p className="text-sm text-gray-700 mt-1 truncate max-w-[200px]">{lastMessage}</p>}
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0 ml-2">
                            <span className="text-xs text-gray-500">{formattedDate}</span>
                            {lastMessage && !isLastMessageAdmin && !isLastMessageReadByAdmin && (
                                <div className="mt-1 relative">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                                    <div className="w-3 h-3 bg-red-600 rounded-full absolute top-0 left-0" />
                                </div>
                            )}
                        </div>
                    </div>

                    {hasProduct && (
                        <div className="mt-2 flex items-center text-xs text-gray-700">
                            <span className="inline-block w-8 h-8 mr-2 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span>상품</span>
                                    </div>
                                )}
                            </span>
                            <span className="truncate">{product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}</span>
                        </div>
                    )}
                </button>
            </li>
        );
    },
);

export default function ChatList({ onSelectRoom, selectedRoomId }: ChatListProps) {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // 깊은 비교를 위한 헬퍼 함수
    const areRoomsEqual = useCallback((oldRooms: ChatRoom[], newRooms: ChatRoom[]) => {
        if (oldRooms.length !== newRooms.length) return false;

        // ID 기반으로 정렬해서 비교
        const sortedOld = [...oldRooms].sort((a, b) => a.id.localeCompare(b.id));
        const sortedNew = [...newRooms].sort((a, b) => a.id.localeCompare(b.id));

        return sortedOld.every((oldRoom, index) => {
            const newRoom = sortedNew[index];
            return (
                oldRoom.id === newRoom.id &&
                oldRoom.last_message_content === newRoom.last_message_content &&
                oldRoom.last_message_is_read_by_admin === newRoom.last_message_is_read_by_admin &&
                oldRoom.last_message_is_read_by_user === newRoom.last_message_is_read_by_user &&
                oldRoom.updated_at === newRoom.updated_at
            );
        });
    }, []);

    // 채팅방 목록을 가져오는 함수 - 의존성 제거로 무한 루프 방지
    const fetchChatRooms = useCallback(
        async (isInitial = false) => {
            try {
                if (isInitial) {
                    setIsInitialLoading(true);
                } else {
                    setIsRefreshing(true);
                }

                // 각 채팅방의 마지막 메시지를 가져오는 복잡한 쿼리
                const { data, error } = await supabase
                    .from("chat_rooms")
                    .select(
                        `
                    *,
                    chat_messages (
                        message,
                        created_at,
                        is_admin,
                        is_read_by_admin,
                        is_read_by_user
                    )
                    `,
                    )
                    .order("created_at", { foreignTable: "chat_messages", ascending: false })
                    .order("updated_at", { ascending: false });

                if (error) throw error;

                // Supabase의 join 결과는 배열 안에 배열로 들어올 수 있으므로, 각 room에 대해 최신 메시지만 추출
                const newRooms: ChatRoom[] = data.map((room: ChatRoom) => {
                    const latestMessage = room.chat_messages.length > 0 ? room.chat_messages[0] : null;
                    return {
                        ...room,
                        last_message_content: latestMessage ? latestMessage.message : null,
                        last_message_created_at: latestMessage ? latestMessage.created_at : null,
                        last_message_is_admin: latestMessage ? latestMessage.is_admin : null,
                        last_message_is_read_by_admin: latestMessage ? latestMessage.is_read_by_admin : null,
                        last_message_is_read_by_user: latestMessage ? latestMessage.is_read_by_user : null,
                    };
                });

                // 실제 변경사항이 있는 경우에만 상태 업데이트
                setRooms(prevRooms => {
                    if (areRoomsEqual(prevRooms, newRooms)) {
                        return prevRooms; // 변경사항이 없으면 기존 상태 유지
                    }
                    return newRooms;
                });
            } catch (error) {
                console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
            } finally {
                if (isInitial) {
                    setIsInitialLoading(false);
                } else {
                    setIsRefreshing(false);
                }
            }
        },
        [areRoomsEqual],
    );

    useEffect(() => {
        // 초기 로드
        fetchChatRooms(true);

        // 실시간 구독 설정 - 더 구체적인 이벤트 필터링
        const subscription = supabase
            .channel("public:chat_rooms_list")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "chat_rooms",
                },
                payload => {
                    // updated_at이 변경된 경우에만 목록 갱신
                    const updatedRoom = payload.new as ChatRoom;
                    if (updatedRoom.updated_at) {
                        // 디바운싱을 위해 약간의 지연 후 업데이트
                        setTimeout(() => fetchChatRooms(false), 100);
                    }
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_rooms",
                },
                () => {
                    // 새 채팅방이 생성된 경우 즉시 업데이트
                    fetchChatRooms(false);
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_messages",
                },
                () => {
                    // 새 메시지가 추가된 경우 목록 업데이트 (마지막 메시지 정보 갱신)
                    setTimeout(() => fetchChatRooms(false), 200);
                },
            )
            .subscribe();

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
            subscription.unsubscribe();
        };
    }, [fetchChatRooms]);

    // 초기 로딩 중일 때만 로딩 스피너 표시
    if (isInitialLoading) {
        return (
            <div className="bg-white rounded-lg shadow h-[calc(100vh-150px)] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <h2 className="font-bold text-lg text-gray-800">채팅 목록</h2>
                    <p className="text-sm text-gray-500">로딩 중...</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow h-[calc(100vh-150px)] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">채팅 목록</h2>
                        <p className="text-sm text-gray-500">{rooms.length}개의 대화</p>
                    </div>
                    {isRefreshing && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500" />}
                </div>
            </div>

            <div className="overflow-y-auto flex-grow">
                {rooms.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">진행 중인 채팅이 없습니다.</div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {rooms.map(room => (
                            <ChatRoomItem key={room.id} room={room} onSelectRoom={onSelectRoom} isSelected={selectedRoomId === room.id} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
