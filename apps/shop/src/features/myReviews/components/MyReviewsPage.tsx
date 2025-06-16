"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/src/features/myReviews/api/userReviewApi";
import MyReviewList from "@/src/features/myReviews/components/MyReviewList";
import Pagination from "@/src/shared/components/shared/Pagination";
import Loading from "@/src/shared/components/shared/Loading";
import ErrorComponent from "@/src/shared/components/shared/ErrorComponent";
import ReviewSortSelect from "@/src/shared/components/ui/ReviewSortSelect";

export default function MyReviewsPage() {
    const searchParams = useSearchParams();

    const monthRange = Number.parseInt(searchParams.get("monthRange") || "3");
    const page = Number.parseInt(searchParams.get("page") || "0");
    const sort = searchParams.get("sort") || undefined;

    const { data, isLoading, error } = useQuery({
        queryKey: ["userReviews", { monthRange, page, sort }],
        queryFn: () => getUserReviews({ monthRange, page, sort }),
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorComponent message={error?.message || "리뷰 불러오기 실패"} />;
    }
    const reviews = data?.content || [];
    const totalPages = data?.totalPages || 0;
    const currentPage = data?.page || 0;
    const totalElements = data?.totalElements || 0;

    return (
        <>
            {/* 리뷰 통계 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-600">총 작성 리뷰</div>
                        <div className="text-2xl font-bold text-black mt-1">{totalElements}개</div>
                    </div>
                </div>
            </div>

            {/* 정렬 선택 */}
            <div className="mb-6">
                <ReviewSortSelect totalCount={totalElements} />
            </div>

            {/* 리뷰 목록 */}
            <MyReviewList reviews={reviews} />

            {/* 페이지네이션 */}
            <Pagination page={currentPage} totalPages={totalPages || 0} />
        </>
    );
}
