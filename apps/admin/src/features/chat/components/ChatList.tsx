import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { supabase, type ChatRoom } from '@/lib/supabase';

interface ChatListProps {
  onSelectRoom: (room: ChatRoom) => void;
  selectedRoomId: string | null;
}

// 개별 채팅방 항목 컴포넌트 - 불필요한 리랜더링 방지
  const ChatRoomItem = memo(({ room, onSelectRoom, isSelected }: {
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
    const roomTitle = hasProduct ? `${product.title} 문의` : '일반 문의';
    const userId = room.user_id.substring(0, 8);
    const formattedDate = new Date(room.created_at).toLocaleDateString();
    
    return (
      <li>
        <button
          type="button"
          onClick={handleClick}
          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
            isSelected ? 'bg-gray-100' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-sm">{roomTitle}</p>
              <p className="text-xs text-gray-500 mt-1">사용자 ID: {userId}...</p>
            </div>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          
          {hasProduct && (
            <div className="mt-2 flex items-center text-xs text-gray-700">
              <span className="inline-block w-8 h-8 mr-2 bg-gray-100 rounded overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span>상품</span>
                  </div>
                )}
              </span>
              <span>
                {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
              </span>
            </div>
          )}
        </button>
      </li>
    );
  });

export default function ChatList({ onSelectRoom, selectedRoomId }: ChatListProps) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  // 채팅방 목록을 가져오는 함수 - useCallback으로 최적화
  const fetchChatRooms = useCallback(async () => {
    try {
      setLoading(true);
      
      // Supabase에서 채팅방 목록을 가져옴 (최신순으로 정렬)
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      
      // 기존 목록과 같은지 비교하여 변경된 경우에만 상태 업데이트
      const newRooms = data as ChatRoom[];
      
      // 기존 목록과 내용이 다른지 비교 (기본적인 비교 방식)
      // JSON을 사용하여 깊은 비교에 필요한 오버헤드를 방지
      let needsUpdate = newRooms.length !== rooms.length;
      
      if (!needsUpdate) {
        // 우선 ID를 비교하여 초기 착준
        const currentIds = new Set(rooms.map(r => r.id));
        const newIds = newRooms.map(r => r.id);
        needsUpdate = newIds.some(id => !currentIds.has(id));
      }
      
      if (needsUpdate) {
        setRooms(newRooms);
      }
    } catch (error) {
      console.error('채팅방 목록을 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  }, [rooms]);
  
  useEffect(() => {
    // 초기 로드
    fetchChatRooms();
    
    // 실시간 구독 설정 - 더 구체적인 이벤트 필터링
    const subscription = supabase
      .channel('public:chat_rooms')
      .on('postgres_changes', {
        event: 'UPDATE', 
        schema: 'public', 
        table: 'chat_rooms'
      }, () => {
        // 변경 감지 시 목록 다시 가져오기
        fetchChatRooms();
      })
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_rooms'
      }, () => {
        fetchChatRooms();
      })
      .subscribe();
    
    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchChatRooms]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="font-bold text-lg text-gray-800">채팅 목록</h2>
        <p className="text-sm text-gray-500">{rooms.length}개의 대화</p>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {rooms.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            진행 중인 채팅이 없습니다.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {rooms.map((room) => (
              <ChatRoomItem 
                key={room.id}
                room={room}
                onSelectRoom={onSelectRoom}
                isSelected={selectedRoomId === room.id}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
