import { useState, useEffect, useCallback } from "react";
import { Link } from '@tanstack/react-router';
import ProductList from "@/features/product/components/ProductList";
import ProductFilters from "@/features/product/components/ProductFilters";
import { Button } from "@/components/ui/button";
import type { Product } from "@/features/product/types";
import { api, fetcher } from "@/shared/kyInstance"; // Import both api and fetcher
import type { PagedResponse } from "@/types/api";

// 백엔드 API 응답 타입 (임시)
interface ProductApiResponse {
    id: number;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    detailImage: string;
    intensity: string;
    cupSize: string;
    isSoldOut: boolean;
}

const mapApiResponseToProduct = (apiProduct: ProductApiResponse): Product => ({
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    price: apiProduct.price,
    quantity: apiProduct.quantity,
    thumbnail: apiProduct.thumbnail,
    detailImage: apiProduct.detailImage,
    intensity: apiProduct.intensity,
    cupSize: apiProduct.cupSize,
    status: apiProduct.isSoldOut ? 'inactive' : 'active',
    updatedAt: new Date().toISOString(), // 백엔드에 없으므로 임시로 현재 시간 사용
});

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Clear previous errors
        try {
            const pagedData = await fetcher<PagedResponse<ProductApiResponse>>("products");

            if (pagedData && Array.isArray(pagedData.content)) {
                const mappedProducts = pagedData.content.map(mapApiResponseToProduct);
                setProducts(mappedProducts);
            } else {
                console.warn("No products content found or API response data is null/invalid:", pagedData);
                setProducts([]); // Default to empty list if content is not as expected
                // Optionally set an error for the user if this state is unexpected
                // setError(new Error("Failed to load product data: unexpected response format."));
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError(err as Error);
            setProducts([]); // Clear products on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id: string) => {
        if (window.confirm(`${id} 상품을 삭제하시겠습니까?`)) {
            try {
                const productId = Number.parseInt(id, 10);
                await api.delete(`admin/products/${productId}`);
                alert("상품이 삭제되었습니다.");
                fetchProducts(); // 목록 새로고침
            } catch (err) {
                alert(`삭제 중 오류가 발생했습니다: ${(err as Error).message}`);
            }
        }
    };

    const handleToggleStatus = async (id: string) => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        // 현재는 상태 변경 API가 없으므로, 낙관적 업데이트만 수행합니다.
        // 백엔드 API가 준비되면 실제 호출 로직을 추가해야 합니다.
        const newStatus = product.status === 'active' ? 'inactive' : 'active';
        setProducts(products.map(p => (p.id === id ? { ...p, status: newStatus } : p)));

        // 예시: API 호출
        // try {
        //     const productId = Number.parseInt(id.replace('PROD-', ''), 10);
        //     await api.put(`admin/products/${productId}/status`, { json: { status: newStatus } });
        //     fetchProducts(); // 또는 로컬에서 상태만 변경
        // } catch (err) {
        //     alert(`상태 변경 중 오류가 발생했습니다: ${(err as Error).message}`);
        //     // 원래 상태로 롤백
        //     setProducts(products.map(p => (p.id === id ? { ...p, status: product.status } : p)));
        // }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col gap-4 p-4 md:p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">상품 목록</h1>
                <Link to="/products/new">
                    <Button>신규 상품 등록</Button>
                </Link>
            </div>
            <ProductFilters />
            <ProductList
                products={products}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
            />
            {/* TODO: 페이지네이션 UI 구현 */}
        </div>
    );
}
