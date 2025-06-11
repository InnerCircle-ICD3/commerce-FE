import { useState } from "react";
import { Link } from '@tanstack/react-router';
import ProductList from "@/features/product/components/ProductList";
import ProductFilters from "@/features/product/components/ProductFilters";
import type { Product } from "@/features/product/types";

export default function ProductsPage() {
    // 가상의 상품 데이터
    const [products, setProducts] = useState<Product[]>([
        {
            id: "PROD-001",
            name: "에티오피아 예가체프",
            price: 3900,
            quantity: 48,
            thumbnail: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop",
            intensity: "중강배전",
            cupSize: "L",
            status: "active",
            updatedAt: "2025-05-28"
        },
        {
            id: "PROD-002",
            name: "브라질 산토스",
            price: 12800,
            quantity: 22,
            thumbnail: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=600&auto=format&fit=crop",
            intensity: "강배전",
            cupSize: "L",
            status: "active",
            updatedAt: "2025-05-29"
        },
        {
            id: "PROD-003",
            name: "과테말라 스위스워터 디카페인",
            price: 32000,
            quantity: 5,
            thumbnail: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=600&auto=format&fit=crop",
            intensity: "강배전",
            cupSize: "S",
            status: "active",
            updatedAt: "2025-05-30"
        },
        {
            id: "PROD-004",
            name: "코스타리카 타라주",
            price: 4500,
            quantity: 120,
            thumbnail: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop",
            intensity: "중배전",
            cupSize: "50ML",
            status: "active",
            updatedAt: "2025-05-30"
        },
        {
            id: "PROD-005",
            name: "브라질 빈할 퍼먼티드",
            price: 5800,
            quantity: 35,
            thumbnail: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop",
            intensity: "중강배전",
            cupSize: "M",
            status: "active",
            updatedAt: "2025-05-30"
        },
        {
            id: "PROD-006",
            name: "케냐 AA",
            price: 4200,
            quantity: 42,
            thumbnail: "https://images.unsplash.com/photo-1596078841242-35518c8a30d6?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1596078841242-35518c8a30d6?q=80&w=600&auto=format&fit=crop",
            intensity: "경배전",
            cupSize: "L",
            status: "active",
            updatedAt: "2025-05-31"
        },
        {
            id: "PROD-007",
            name: "콜롬비아 수프리모",
            price: 18500,
            quantity: 12,
            thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
            intensity: "강배전",
            cupSize: "L",
            status: "active",
            updatedAt: "2025-05-31"
        },
        {
            id: "PROD-008",
            name: "콜롬비아 리치피치 디카페인",
            price: 25000,
            quantity: 8,
            thumbnail: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
            intensity: "약배전",
            cupSize: "M",
            status: "active",
            updatedAt: "2025-06-01"
        },
        {
            id: "PROD-009",
            name: "콜롬비아 아바야 게이샤",
            price: 12000,
            quantity: 18,
            thumbnail: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop",
            intensity: "중배전",
            cupSize: "S",
            status: "active",
            updatedAt: "2025-05-30"
        },
        {
            id: "PROD-010",
            name: "예멘 모카 마타리",
            price: 7200,
            quantity: 0,
            thumbnail: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=100&auto=format&fit=crop",
            detailImage: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=600&auto=format&fit=crop",
            intensity: "중배전",
            cupSize: "M",
            status: "active",
            updatedAt: "2025-06-01"
        },
    ]);

    // 상품 삭제 기능
    const handleDeleteProduct = (productId: string) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    // 상품 상태 변경 기능
    const handleToggleStatus = (productId: string) => {
        setProducts(
            products.map(product =>
                product.id === productId ? { ...product, status: product.status === "active" ? "inactive" : "active" } : product,
            ),
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-gray-900">상품 관리</h1>
                    <p className="mt-2 text-gray-600">상품 목록을 확인하고 관리하세요.</p>
                </div>
                <Link
                    to="/products/new"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    + 상품 추가
                </Link>
            </div>

            {/* 필터링 UI */}
            <ProductFilters />
            
            {/* 상품 테이블 */}
            <ProductList 
                products={products} 
                onDelete={handleDeleteProduct} 
                onToggleStatus={handleToggleStatus} 
            />
            
            {/* 페이지네이션 */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">10개 항목 중 1-10 표시</div>
                <nav className="flex space-x-1">
                    <button type="button" className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        이전
                    </button>
                    <button type="button" className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-blue-600 text-white">
                        1
                    </button>
                    <button type="button" className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        2
                    </button>
                    <button type="button" className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        3
                    </button>
                    <button type="button" className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        다음
                    </button>
                </nav>
            </div>
        </div>
    );
}
