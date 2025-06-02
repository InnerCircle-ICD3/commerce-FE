"use client";

import ProductReviewCard from "./ProductReviewCard";
import type { Review } from "@/src/shared/entities/review/types";

interface ProductReviewListProps {
    reviews: Review[];
    hasMore?: boolean;
}

export default function ProductReviewList({ reviews, hasMore = true }: ProductReviewListProps) {
    const handleLoadMore = () => {
        console.log("더보기 클릭");
        // TODO: 추가 리뷰 로딩 로직 구현
    };

    return (
        <div className="space-y-6">
            {/* 리뷰 목록 */}
            <div className="space-y-6">
                {reviews.map(review => (
                    <ProductReviewCard key={review.id} review={review} />
                ))}
            </div>

            {/* 더보기 버튼 */}
            {hasMore && (
                <div className="flex justify-center pt-2">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className="flex items-center gap-2 px-6 py-3 border border-black rounded-lg text-base font-bold text-black hover:bg-gray-50"
                    >
                        더보기
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="none" aria-hidden="true">
                            <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
