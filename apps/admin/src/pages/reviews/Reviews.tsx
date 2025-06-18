import type { Review, ReviewData } from "@/features/review/types/type";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { createStars } from "@/shared/utils/createStars";
import ReviewDetail from "@/features/review/components/ReviewDetail";
import Search from "@/shared/components/shared/Search";
import { Pagination } from "@/shared/components/ui/pagination";
import { formatDateTime } from "@commerce-fe/utils";
import { fetcher } from "@/shared/kyInstance";

export default function ReviewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortingType, setSortingType] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("productName"); // "productName", "productId"

    const { data } = useQuery<ReviewData>({
        queryKey: ["reviews", query, sortingType, currentPage],
        // queryFn: () => getMockReviews(), // 목 데이터 사용
        queryFn: () => {
            const searchParam = query ? `${searchType}=${query}&` : "";
            const sortParam = sortingType ? `sort=${sortingType}&` : "";
            const pageParam = `page=${currentPage}&`;
            const isParamEmpty = !searchParam && !sortParam && !pageParam;

            return fetcher(`admin/reviews${isParamEmpty ? "" : "?"}${searchParam}${sortParam}${pageParam}`);
        },
    });

    const reviews: Review[] = data?.content || [];
    const totalPages: number = data?.totalPages || 0;
    const [openedReviewIds, setOpenedReviewIds] = useState<number[]>([]); // query, sortingType, searchType이 변경될 때마다 현재 페이지를 1로 초기화하고, 열려있는 리뷰 ID 목록을 초기화합니다.

    // 트리거용이라 biome-ignore를 사용했습니다.
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        setCurrentPage(1);
        setOpenedReviewIds([]);
    }, [query, sortingType, searchType]);

    const toggleReviewDetails = (reviewId: number) => {
        setOpenedReviewIds(prev => (prev.includes(reviewId) ? prev.filter(id => id !== reviewId) : [...prev, reviewId]));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortingType(value);
    };

    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSearchType(value);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-gray-900">리뷰 관리</h1>
                    <p className="mt-2 text-gray-600">리뷰 목록을 확인하고 관리하세요.</p>
                </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Search placeholder="검색어를 입력하세요" setSearchQuery={setQuery}>
                    <>
                        {/* 검색 타입 선택 */}
                        <div className="w-auto">
                            <select
                                className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchType}
                                onChange={handleSearchTypeChange}
                                aria-label="search type options"
                            >
                                <option value="productName">상품명</option>
                                <option value="productId">상품 ID</option>
                            </select>
                        </div>
                        {/* 정렬 옵션 */}
                        <div className="w-auto">
                            <select
                                className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={sortingType}
                                onChange={handleSortingChange}
                                aria-label="sorting options"
                            >
                                <option value="">최신순</option>
                                <option value="-rating">별점 높은순</option>
                                <option value="rating">별점 낮은순</option>
                            </select>
                        </div>
                    </>
                </Search>
            </div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">리뷰 ID</TableHead>
                            <TableHead>상품 ID</TableHead>
                            <TableHead>상품명</TableHead>
                            <TableHead className="text-right">평점</TableHead>
                            <TableHead className="text-right">작성자</TableHead>
                            <TableHead className="text-right">등록일</TableHead>
                            <TableHead className="text-right">상태</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map(review => (
                            <Fragment key={review.reviewId}>
                                <TableRow
                                    className={`${review.adminReply ? "bg-[#F9FAFB]" : "bg-white"} cursor-pointer`}
                                    onClick={() => toggleReviewDetails(review.reviewId)}
                                >
                                    <TableCell className="font-medium">{review.reviewId}</TableCell>
                                    <TableCell>{review.product.productId}</TableCell>
                                    <TableCell>{review.product.productName}</TableCell>
                                    <TableCell className="text-right">{createStars(review.rating)}</TableCell>
                                    <TableCell className="text-right">{`${review.user.nickname}(${review.user.userId})`}</TableCell>
                                    <TableCell className="text-right">{formatDateTime(review.createdAt)}</TableCell>
                                    <TableCell className="text-right">{review.adminReply ? "답변 완료" : "미답변"}</TableCell>
                                </TableRow>
                                {openedReviewIds.includes(review.reviewId) && <ReviewDetail review={review} />}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
