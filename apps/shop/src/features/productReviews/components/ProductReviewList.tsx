"use client";

import ProductReviewCard from "./ProductReviewCard";
import type { Review } from "@/src/shared/entities/review/types";

interface ProductReviewListProps {
    reviews: Review[];
}

export default function ProductReviewList({ reviews }: ProductReviewListProps) {
    return (
        <div className="space-y-6">
            {/* 리뷰 목록 */}
            <div className="space-y-6">
                {reviews.map(review => (
                    <ProductReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}
