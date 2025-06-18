import type { Product as ApiProduct } from "@/features/product/api";
import { deleteProduct, productsQueryOptions, updateProductStatus } from "@/features/product/queries";
import { Route } from "@/routes/_authenticated/products";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Pagination } from "@/shared/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table/table";
import { toast } from "@/shared/components/ui/use-toast";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

// 프론트엔드에서 사용할 상품 타입
type Product = ApiProduct & { sellingStatus: "SELLING" | "SOLD_OUT"; stock: number };

export default function ProductsPage() {
    const { page = 1, size = 10 } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const queryClient = useQueryClient();

    // 상태 관리
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState<"SELLING" | "SOLD_OUT" | "">("");

    // 상품 목록 조회 쿼리
    const { data } = useSuspenseQuery(
        productsQueryOptions({
            page: page - 1,
            size,
            keyword: searchKeyword || undefined,
            sellingStatus: statusFilter || undefined,
        }),
    );

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

    // 상품 상태 변경 뮤테이션
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: "SELLING" | "SOLD_OUT" }) => updateProductStatus(id, status === "SOLD_OUT"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast({
                title: "상태 변경 완료",
                description: "상품 상태가 변경되었습니다.",
            });
        },
        onError: error => {
            toast({
                title: "상태 변경 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        navigate({ search: prev => ({ ...prev, page: newPage }) });
    };

    // 삭제 대화상자 핸들러
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteDialogOpen(true);
    };

    // 상태 변경 핸들러
    const handleToggleStatus = (product: Product) => {
        const newStatus = product.sellingStatus === "SELLING" ? "SOLD_OUT" : "SELLING";
        updateStatusMutation.mutate({ id: product.id, status: newStatus });
    };

    // 검색 핸들러
    const handleSearch = () => {
        navigate({ search: prev => ({ ...prev, page: 1 }) });
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
            <div className="flex gap-4">
                <div className="flex-1 flex gap-2">
                    <Input
                        placeholder="상품명 검색"
                        value={searchKeyword}
                        onChange={e => setSearchKeyword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearch()}
                        className="max-w-xs"
                    />
                    <Button variant="outline" onClick={handleSearch}>
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <Select
                    value={statusFilter === "" ? "ALL" : statusFilter || undefined}
                    onValueChange={value => {
                        // 타입 안전을 위한 검증 - "ALL"을 빈 문자열로 변환
                        const typedValue = value === "ALL" ? "" : value as "SELLING" | "SOLD_OUT" | "";
                        setStatusFilter(typedValue);
                        navigate({ search: prev => ({ ...prev, page: 1 }) });
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="판매 상태" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="ALL">전체</SelectItem>
                            <SelectItem value="SELLING">판매중</SelectItem>
                            <SelectItem value="SOLD_OUT">품절</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* 상품 목록 테이블 */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <Table>
                    <TableCaption>상품 목록</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>상품명</TableHead>
                            <TableHead>가격</TableHead>
                            <TableHead>재고</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead>관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.content.map((product: Product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <img src={product.thumbnail} alt={product.name} className="h-10 w-10 rounded-md object-cover mr-4" />
                                        <span>{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{product.price.toLocaleString()}원</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <Badge variant={product.sellingStatus === "SELLING" ? "outline" : "destructive"}>
                                        {product.sellingStatus === "SELLING" ? "판매중" : "품절"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleToggleStatus(product)}
                                            disabled={updateStatusMutation.isPending}
                                        >
                                            {product.sellingStatus === "SELLING" ? "품절 처리" : "판매 처리"}
                                        </Button>
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
                        {data.content.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    상품이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 페이지네이션 */}
            <Pagination currentPage={page} totalItems={data.totalElements} onPageChange={handlePageChange} />

            {/* 삭제 확인 대화 상자 */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>상품 삭제</DialogTitle>
                        <DialogDescription>정말로 "{productToDelete?.name}" 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={deleteMutation.isPending}>
                            취소
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => productToDelete && deleteMutation.mutate(productToDelete.id)}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
