import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 설정
const supabaseUrl = "https://lmqyvuxfubsudknigrgz.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcXl2dXhmdWJzdWRrbmlncmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Nzk4NDAsImV4cCI6MjA2NTQ1NTg0MH0.pxVFLErPy9SfE4G2lF4rmnZzvTBCf7b7BUvz5LjcnYo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 채팅 관련 타입 선언
export interface ChatRoom {
    id: string;
    user_id: string;
    admin_id: string | null;
    created_at: string;
    updated_at: string;
    product_info: ProductInfo | null;
    last_message_content: string | null; // 최신 메시지 내용
    last_message_created_at: string | null; // 최신 메시지 생성 시간
    last_message_is_admin: boolean | null; // 최신 메시지가 관리자가 보낸 것인지
    last_message_is_read_by_admin: boolean | null; // 최신 메시지를 관리자가 읽었는지
    last_message_is_read_by_user: boolean | null; // 최신 메시지를 사용자가 읽었는지
    admin_last_read_message_created_at: string | null; // 관리자가 마지막으로 읽은 메시지 생성 시간
    chat_messages: ChatMessage[]; // 관계형 데이터 로드를 위한 필드 추가
    unread_count: number; // 추가: 관리자가 읽지 않은 메시지 수
}

export interface ChatMessage {
    id: string;
    room_id: string;
    sender_id: string;
    message: string;
    is_admin: boolean;
    created_at: string;
    is_read_by_admin: boolean;
    is_read_by_user: boolean;
}

export interface ProductInfo {
    id: string;
    title: string;
    price: number;
    image: string;
}

// 관리자 ID (UUID 형식으로 변경) - Supabase의 sender_id 필드가 UUID 타입이므로
export const ADMIN_ID = "123e4567-e89b-12d3-a456-426614174000"; // 고정된 UUID 형식의 관리자 ID
