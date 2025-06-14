import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = 'https://lmqyvuxfubsudknigrgz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcXl2dXhmdWJzdWRrbmlncmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Nzk4NDAsImV4cCI6MjA2NTQ1NTg0MH0.pxVFLErPy9SfE4G2lF4rmnZzvTBCf7b7BUvz5LjcnYo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 채팅 관련 타입 선언
export interface ChatRoom {
  id: string;
  user_id: string;
  admin_id: string | null;
  created_at: string;
  updated_at: string;
  product_info: ProductInfo | null;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
}

export interface ProductInfo {
  id: string;
  title: string;
  price: number;
  image: string;
}

// 관리자 ID (UUID 형식으로 변경) - Supabase의 sender_id 필드가 UUID 타입이므로
export const ADMIN_ID = '123e4567-e89b-12d3-a456-426614174000'; // 고정된 UUID 형식의 관리자 ID
