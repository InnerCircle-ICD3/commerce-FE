import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { Pagination } from "@/shared/components/ui/pagination";
import { Link } from "@tanstack/react-router";
import { useOrders } from "@/features/order/hooks/useOrders";
import type { GetOrdersRequestDto } from "@/features/order/api/getOrders";
import { useOrderStatus } from "@/features/order/hooks/useOrderStatus";

type SearchType = "orderNumber" | "customerName" | "productName";

const initialQuery: GetOrdersRequestDto = {
    page: 1,
    productName: "",
    orderNumber: "",
    status: "",
    nickname: "",
    dateTo: "",
    dateFrom: "",
};
export default function OrdersPage() {
    const [searchType, setSearchType] = useState<SearchType>("orderNumber");
    const [query, setQuery] = useState<GetOrdersRequestDto>(initialQuery);
    const { data: orderStatus } = useOrderStatus();
    const { orders, totalPages, totalElements } = useOrders(query);
    // 페이지 변경 핸들러

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const keyword = formData.get("keyword") as string;

        if (searchType === "orderNumber") {
            setQuery({ ...initialQuery, status: query.status, orderNumber: keyword });
        } else if (searchType === "customerName") {
            setQuery({ ...initialQuery, status: query.status, nickname: keyword });
        } else if (searchType === "productName") {
            setQuery({ ...initialQuery, status: query.status, productName: keyword });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-gray-900">주문 관리</h1>
                    <p className="mt-2 text-gray-600">주문 목록을 확인하고 관리하세요.</p>
                </div>
            </div>
            {/* 필터링 및 검색 UI */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-wrap gap-2">
                    {/* 검색 */}

                    <div>
                        <select
                            className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchType}
                            onChange={e => setSearchType(e.target.value as SearchType)}
                        >
                            <option value="orderNumber">주문번호</option>
                            <option value="customerName">주문자</option>
                            <option value="productName">주문상품</option>
                        </select>
                    </div>

                    <div className="w-auto">
                        <select
                            className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            name="status"
                            onChange={e => setQuery({ ...query, status: e.target.value })}
                        >
                            <option value="">전체</option>
                            {orderStatus?.map(status => (
                                <option key={status.code} value={status.code}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[240px]">
                        <div className="relative">
                            <form action="" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="상품명 또는 ID 검색"
                                    name="keyword"
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
                            </form>
                        </div>
                    </div>

                    {/* 상태 필터 */}
                </div>
            </div>
            {/* 상품 테이블 */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Table>
                    <TableCaption>총 {totalElements}개의 주문이 있습니다.</TableCaption>
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
                        {orders?.map(order => (
                            <TableRow key={order.orderNumber}>
                                <TableCell className="font-medium">
                                    <Link to="/orders/$orderId" params={{ orderId: order.orderId.toString() }} className="underline">
                                        {order.orderNumber}
                                    </Link>
                                </TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.orderName}</TableCell>
                                <TableCell>₩{order.finalTotalPrice?.toLocaleString()}</TableCell>
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
            <Pagination currentPage={query.page || 1} totalPages={totalPages || 0} onPageChange={page => setQuery({ ...query, page })} />
        </div>
    );
}
