import { useState } from "react";
import ProductList from "@/features/product/components/ProductList";
import ProductFilters from "@/features/product/components/ProductFilters";
import type { Product } from "@/features/product/types";

export default function ProductsPage() {
    // 가상의 상품 데이터
    const [products, setProducts] = useState<Product[]>([
        {
            id: "PROD-001",
            name: "유기농 아보카도",
            category: "과일/채소",
            price: 3900,
            stock: 48,
            status: "active",
            updatedAt: "2025-05-28",
        },
        {
            id: "PROD-002",
            name: "제주 감귤 2kg",
            category: "과일/채소",
            price: 12800,
            stock: 22,
            status: "active",
            updatedAt: "2025-05-29",
        },
        {
            id: "PROD-003",
            name: "국내산 한우 1++",
            category: "정육/계란",
            price: 32000,
            stock: 5,
            status: "active",
            updatedAt: "2025-05-30",
        },
        {
            id: "PROD-004",
            name: "친환경 당근",
            category: "과일/채소",
            price: 4500,
            stock: 120,
            status: "active",
            updatedAt: "2025-05-30",
        },
        {
            id: "PROD-005",
            name: "통밀빵",
            category: "베이커리",
            price: 5800,
            stock: 35,
            status: "active",
            updatedAt: "2025-05-30",
        },
        {
            id: "PROD-006",
            name: "유기농 우유",
            category: "유제품",
            price: 4200,
            stock: 42,
            status: "active",
            updatedAt: "2025-05-31",
        },
        {
            id: "PROD-007",
            name: "고급 수입 치즈",
            category: "유제품",
            price: 18500,
            stock: 12,
            status: "active",
            updatedAt: "2025-05-31",
        },
        {
            id: "PROD-008",
            name: "동결건조 과일 세트",
            category: "간식",
            price: 24000,
            stock: 8,
            status: "inactive",
            updatedAt: "2025-05-25",
        },
        {
            id: "PROD-009",
            name: "유기농 사과즙",
            category: "음료",
            price: 7500,
            stock: 28,
            status: "active",
            updatedAt: "2025-05-29",
        },
        {
            id: "PROD-010",
            name: "수입 아몬드",
            category: "견과류",
            price: 12000,
            stock: 18,
            status: "active",
            updatedAt: "2025-05-30",
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
                <button
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    + 상품 추가
                </button>
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
