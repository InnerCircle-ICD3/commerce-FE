import type { ChatRoom } from "@/lib/supabase";
import { useState } from "react";
import ChatConversation from "../components/ChatConversation";
import ChatList from "../components/ChatList";

/**
 * 관리자 채팅 관리 페이지
 * - 왼쪽에는 채팅방 목록 (ChatList)
 * - 오른쪽에는 선택된 채팅방의 대화 내용 (ChatConversation)
 */
export default function ChatManagement() {
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b">
                <h1 className="text-2xl font-bold">고객 채팅 관리</h1>
                <p className="text-gray-500">실시간 고객 상담 서비스를 관리합니다.</p>
            </div>

            <div className="flex-1 flex gap-4 p-4 min-h-0">
                {/* 채팅방 목록 (왼쪽 사이드바) */}
                <div className="w-1/3">
                    <ChatList onSelectRoom={setSelectedRoom} selectedRoomId={selectedRoom?.id || null} />
                </div>

                {/* 채팅 내용 (오른쪽 메인 영역) */}
                <div className="w-2/3">
                    <ChatConversation room={selectedRoom} />
                </div>
            </div>
        </div>
    );
}
