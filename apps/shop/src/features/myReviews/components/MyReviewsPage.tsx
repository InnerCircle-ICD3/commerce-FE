"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/src/features/myReviews/api/userReviewApi";
import MyReviewList from "@/src/features/myReviews/components/MyReviewList";
import Pagination from "@/src/shared/components/shared/Pagination";
import Loading from "@/src/shared/components/shared/Loading";
import ErrorComponent from "@/src/shared/components/shared/ErrorComponent";

export default function MyReviewsPage() {
    const searchParams = useSearchParams();

    const monthRange = Number.parseInt(searchParams.get("monthRange") || "3");
    const page = Number.parseInt(searchParams.get("page") || "0");

    const { data, isLoading, error } = useQuery({
        queryKey: ["userReviews", { monthRange, page }],
        queryFn: () => getUserReviews({ monthRange, page }),
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

    return (
        <>
            {/* 리뷰 통계 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-600">총 작성 리뷰</div>
                        <div className="text-2xl font-bold text-black mt-1">{reviews.length}개</div>
                    </div>
                </div>
            </div>

            {/* 리뷰 목록 */}
            <MyReviewList reviews={reviews} hasMore={currentPage < totalPages - 1} />

            {/* 페이지네이션 */}
            <Pagination page={currentPage} totalPages={totalPages || 0} />
        </>
    );
}
