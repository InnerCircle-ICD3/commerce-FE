import type { Product as ApiProduct } from "@/features/product/api";
import { deleteProduct } from "@/features/product/queries";
import { Route } from "@/routes/_authenticated/products";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Pagination } from "@/shared/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { toast } from "@/shared/components/ui/use-toast";
import Search from "@/shared/components/shared/Search";
import { fetcher } from "@/shared/kyInstance";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

// 프론트엔드에서 사용할 상품 타입 (서버 응답 그대로 사용)
type Product = ApiProduct;

// 상품 목록 응답 타입
interface ProductData {
    content: Product[];
    totalPages: number;
    totalElements: number;
    page: number;
    size: number;
}

export default function ProductsPage() {
    const navigate = useNavigate({ from: Route.fullPath });
    const queryClient = useQueryClient();

    // 상태 관리 (리뷰관리 페이지와 동일한 방식)
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("name"); // "name", "intensity", "cupSize", "status"
    const [statusFilter, setStatusFilter] = useState<string>("ALL"); // "ALL", "SELLING", "SOLD_OUT"
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    // 리뷰관리 페이지와 동일한 방식으로 API 호출
    const { data, isFetching } = useQuery<ProductData>({
        queryKey: ["products", query, searchType, statusFilter, currentPage],
        queryFn: () => {
            const searchParam = query ? `${searchType}=${encodeURIComponent(query)}&` : "";
            const statusParam = statusFilter !== "ALL" ? `status=${statusFilter === "SELLING" ? "ON_SALE" : "UNAVAILABLE"}&` : "";
            const pageParam = `page=${currentPage - 1}&size=10&`;
            const isParamEmpty = !searchParam && !statusParam && !pageParam;

            return fetcher(`admin/products${isParamEmpty ? "" : "?"}${searchParam}${statusParam}${pageParam}`);
        },
    });

    const products: Product[] = data?.content || [];
    const totalPages: number = data?.totalPages || 0;

    // query, searchType, statusFilter가 변경될 때마다 현재 페이지를 1로 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, [query, searchType, statusFilter]);

    // 상품 삭제 뮤테이션
    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast({
                title: "삭제 완료",
                description: "상품이 성공적으로 삭제되었습니다.",
            });
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
        },
        onError: error => {
            toast({
                title: "삭제 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // 삭제 대화상자 핸들러
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteDialogOpen(true);
    };

    // 검색 타입 변경 핸들러
    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSearchType(value);
    };

    // 상태 필터 변경 핸들러
    const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setStatusFilter(value);
    };

    // 상품 등록 페이지 이동 핸들러
    const handleRegisterClick = () => {
        navigate({ to: "/products/new" });
    };

    // 상품 편집 페이지 이동 핸들러
    const handleEditClick = (productId: number) => {
        navigate({ to: `/products/${productId}/edit` });
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-gray-900">상품 관리</h1>
                    <p className="mt-2 text-gray-600">상품 목록을 확인하고 관리하세요.</p>
                </div>
                <Button onClick={handleRegisterClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    상품 등록
                </Button>
            </div>

            {/* 검색 및 필터링 */}
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
                                <option value="name">상품명</option>
                                <option value="intensity">강도</option>
                                <option value="cupSize">용량</option>
                                <option value="status">상태</option>
                            </select>
                        </div>
                        {/* 상태 필터 */}
                        <div className="w-auto">
                            <select
                                className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                                aria-label="status filter options"
                            >
                                <option value="ALL">전체</option>
                                <option value="SELLING">판매중</option>
                                <option value="SOLD_OUT">품절</option>
                            </select>
                        </div>
                    </>
                </Search>
            </div>

            {/* 상품 목록 테이블 */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white relative">
                {isFetching && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="flex items-center gap-2 text-blue-600">
                            <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                            <span>검색 중...</span>
                        </div>
                    </div>
                )}
                <Table>
                    <TableCaption>상품 목록</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>상품명</TableHead>
                            <TableHead>가격</TableHead>
                            <TableHead>재고</TableHead>
                            <TableHead>강도</TableHead>
                            <TableHead>용량</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead>관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product: Product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <img src={product.thumbnail} alt={product.name} className="h-10 w-10 rounded-md object-cover mr-4" />
                                        <span>{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{product.price.toLocaleString()}원</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.intensity}</TableCell>
                                <TableCell>{product.cupSize}</TableCell>
                                <TableCell>
                                    <Badge variant={product.status === "ON_SALE" ? "outline" : "destructive"}>
                                        {product.status === "ON_SALE" ? "판매중" : "품절"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        {/* <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleToggleStatus(product)}
                                            disabled={updateStatusMutation.isPending}
                                        >
                                            {product.status === "ON_SALE" ? "품절 처리" : "판매 처리"}
                                        </Button> */}
                                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(product.id)}>
                                            편집
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDeleteClick(product)}
                                            disabled={deleteMutation.isPending}
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    상품이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            {/* 삭제 확인 대화 상자 */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center space-y-4">
                        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>
                        <DialogTitle className="text-xl font-semibold text-gray-900">상품을 삭제하시겠습니까?</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            <div className="space-y-2">
                                <p className="font-medium">"{productToDelete?.name}"</p>
                                <p className="text-sm">이 작업은 되돌릴 수 없습니다.</p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={deleteMutation.isPending}
                            className="w-full sm:w-auto"
                        >
                            취소
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => productToDelete && deleteMutation.mutate(productToDelete.id)}
                            disabled={deleteMutation.isPending}
                            className="w-full sm:w-auto"
                        >
                            {deleteMutation.isPending ? "삭제 중..." : "삭제하기"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
