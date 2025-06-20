"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import SearchFilter from "./SearchFilter";
import ProductList from "./ProductList";
import { searchProducts } from "@/src/features/search/api/searchProductApi";
import { getProductCategories, type CategoriesResponse, type CategoryItem } from "@/src/features/search/api/categoriesApi";
import type { SearchResultResponse, Product } from "@/src/features/search/types";
import Loading from "@/src/shared/components/shared/Loading";

// 그룹핑 로직 제거 - 개별 선택 방식으로 변경

interface SearchPageProps {
    initialProducts?: Product[];
    initialTotalElements?: number;
    initialSearchTerm?: string;
}

export default function SearchPage({ initialProducts = [], initialTotalElements = 0, initialSearchTerm = "" }: SearchPageProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || initialSearchTerm;

    const [searchResults, setSearchResults] = useState<SearchResultResponse | null>({
        content: initialProducts,
        totalElements: initialTotalElements,
        totalPages: Math.ceil(initialTotalElements / 20),
        page: 0,
        size: 20,
    });
    const [productsLoading, setProductsLoading] = useState(false); // 상품 목록만을 위한 로딩 상태
    const [categoriesLoading, setCategoriesLoading] = useState(true); // 카테고리 로딩 상태
    const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null);
    const [selectedCupSize, setSelectedCupSize] = useState<string | null>(null);

    // 카테고리 상태
    const [categories, setCategories] = useState<CategoriesResponse | null>(null);

    // 카테고리 로드
    const loadCategories = useCallback(async () => {
        setCategoriesLoading(true);
        try {
            const categoriesData = await getProductCategories();
            setCategories(categoriesData);
        } finally {
            setCategoriesLoading(false);
        }
    }, []);

    const fetchSearchResults = useCallback(async () => {
        setProductsLoading(true); // 상품 목록만 로딩 표시
        try {
            // 개별 ID를 직접 사용 (그룹핑 없음)
            const intensityIds = selectedIntensity || undefined;
            const cupSizeIds = selectedCupSize || undefined;

            const results = await searchProducts(query, 0, 20, intensityIds, cupSizeIds);
            setSearchResults(results);
        } catch (error) {
            console.error("검색 실패:", error);
        } finally {
            setProductsLoading(false);
        }
    }, [query, selectedIntensity, selectedCupSize]);

    // 초기 카테고리 로드
    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    // 검색 실행
    useEffect(() => {
        // 카테고리가 로드된 후에만 검색 실행
        if (categories) {
            fetchSearchResults();
        }
    }, [fetchSearchResults, categories]);

    const handleIntensityChange = (intensity: string | null) => {
        setSelectedIntensity(intensity);
    };

    const handleCupSizeChange = (cupSize: string | null) => {
        setSelectedCupSize(cupSize);
    };

    // 카테고리가 로딩 중일 때만 전체 로딩 화면 표시
    if (categoriesLoading || !categories) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loading message="검색 결과를 불러오는 중..." />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 md:px-8">
            {/* 메인 콘텐츠 */}
            <main className="flex-1 bg-white py-8">
                <div className="max-w-[75rem] mx-auto">
                    {/* 필터 및 상품 목록 */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* 필터 - 항상 표시 */}
                        <SearchFilter
                            resultCount={searchResults?.totalElements}
                            selectedIntensity={selectedIntensity}
                            selectedCupSize={selectedCupSize}
                            onIntensityChange={handleIntensityChange}
                            onCupSizeChange={handleCupSizeChange}
                            searchTerm={query}
                            intensities={categories?.intensities || []}
                            cupSizes={categories?.cupSizes || []}
                        />

                        {/* 상품 목록 - 로딩 중일 때 별도 처리 */}
                        <div className="flex-1 min-w-0">
                            {productsLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <Loading message="상품을 검색하는 중..." />
                                </div>
                            ) : (
                                <ProductList products={searchResults?.content || []} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
