import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { Pagination } from "@/shared/components/ui/pagination";
import { Link } from "@tanstack/react-router";

interface Order {
    orderNumber: string;
    orderName: string;
    orderStatus: string;
    finalTotalPrice: number;
    cancellable: boolean;
    refundable: boolean;
    orderedAt: string;
    userName: string;
}

export default function OrdersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const orders: Order[] = [
        {
            orderNumber: "ORD123412441422",
            orderName: "스페셜 리저브 외 3건",
            orderStatus: "배송 준비중",
            finalTotalPrice: 13000,
            cancellable: true,
            refundable: true,
            orderedAt: "2025-06-01T15:00:11.123Z",
            userName: "홍길동",
        },
        {
            orderNumber: "ORD123412441422",
            orderName: "스페셜 리저브 외 5건",
            orderStatus: "배송 준비중",
            finalTotalPrice: 13000,
            cancellable: true,
            refundable: true,
            orderedAt: "2025-06-01T15:00:11.123Z",
            userName: "홍길동",
        },
    ];

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-gray-900">상품 관리</h1>
                    <p className="mt-2 text-gray-600">상품 목록을 확인하고 관리하세요.</p>
                </div>
                <button
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    + 상품 추가
                </button>
            </div>
            {/* 필터링 및 검색 UI */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-wrap gap-4">
                    {/* 검색 */}
                    <div className="flex-1 min-w-[240px]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="상품명 또는 ID 검색"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <title>검색</title>
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* 상태 필터 */}
                    <div className="w-auto">
                        <select className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">모든 상태</option>
                            <option value="active">주문완료</option>
                            <option value="inactive">주문취소</option>
                            <option value="inactive">배송 준비중</option>
                            <option value="inactive">배송중</option>
                            <option value="inactive">배송완료</option>
                            <option value="inactive">환불완료</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* 상품 테이블 */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Table>
                    <TableCaption>총 {orders.length}개의 주문이 있습니다.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">주문번호</TableHead>
                            <TableHead>주문자</TableHead>
                            <TableHead>주문상품</TableHead>
                            <TableHead>결제금액</TableHead>
                            <TableHead>주문상태</TableHead>
                            <TableHead>주문일자</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.orderNumber}>
                                <TableCell className="font-medium">
                                    <Link to="/orders/$orderNumber" params={{ orderNumber: order.orderNumber }} className="underline">
                                        {order.orderNumber}
                                    </Link>
                                </TableCell>
                                <TableCell>{order.userName}</TableCell>
                                <TableCell>{order.orderName}</TableCell>
                                <TableCell>₩{order.finalTotalPrice.toLocaleString()}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            order.orderStatus === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell>{order.orderedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalItems={orders.length} onPageChange={handlePageChange} />
        </div>
    );
}
