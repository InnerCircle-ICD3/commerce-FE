import type { ChatResponse } from "@/features/chat/types/types";
import { Pagination } from "@/shared/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { fetcher } from "@/shared/kyInstance";
import { useQuery } from "@tanstack/react-query";
import { type ChangeEvent, useState } from "react";

export default function ChatPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortingType, setSortingType] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    const { data } = useQuery<ChatResponse>({
        queryKey: ["chats", query, sortingType],
        // queryFn: () => getMockReviews(), // 목 데이터 사용
        queryFn: () => {
            const searchParam = query ? `search=${query}&` : "";
            const sortParam = sortingType ? `sort=${sortingType}` : "";
            const isParamEmpty = !searchParam && !sortParam;

            return fetcher(`admin/reviews${isParamEmpty ? "" : "?"}${searchParam}${sortParam}`);
        },
    });

    const chats = data?.chats || [];

    function handleSortingChange(event: ChangeEvent<HTMLSelectElement>): void {
        throw new Error("Function not implemented.");
    }

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-gray-900">채팅 관리</h1>
                    <p className="mt-2 text-gray-600">채팅 목록을 확인하고 관리하세요.</p>
                </div>
            </div>

            {/* 검색 및 정렬 기능 */}

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">채팅방 ID</TableHead>
                            <TableHead>유저</TableHead>
                            <TableHead>상품</TableHead>
                            <TableHead>내용</TableHead>
                            <TableHead className="text-right">등록일</TableHead>
                            <TableHead className="text-right">상태</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chats.map(chat => (
                            <TableRow key={chat.roomId}>
                                <TableCell className="font-medium">{chat.roomId}</TableCell>
                                <TableCell>{chat.user.nickname}</TableCell>
                                <TableCell>{chat.product ? chat.product.productName : "없음"}</TableCell>
                                <TableCell>{chat.chatContent[0].content}</TableCell>
                                <TableCell className="text-right">{new Date(chat.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">활성</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalItems={chats.length} onPageChange={handlePageChange} />
        </div>
    );
}
