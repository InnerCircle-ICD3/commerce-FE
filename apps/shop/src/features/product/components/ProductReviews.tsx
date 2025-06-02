"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReviewType } from "@/src/features/product/types";

interface ProductReviewsProps {
    productId: string;
    reviews: ReviewType[];
    totalRating: number;
    ratingCounts: number[];
}

export function ProductReviews({ productId, reviews, totalRating, ratingCounts }: ProductReviewsProps) {
    const [expanded, setExpanded] = useState(false);

    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={`star-position-${i}-filled-${i < rating}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                            fill={i < rating ? "#ffc000" : "#e0e0e0"}
                        />
                    </svg>
                ))}
            </div>
        );
    };

    const calculatePercentage = (count: number) => {
        const total = ratingCounts.reduce((a, b) => a + b, 0);
        return total > 0 ? (count / total) * 100 : 0;
    };

    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">리뷰</h2>
                    <Link href={`/review/products/${productId}`} aria-label="모든 리뷰 보기">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 8L20 16L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                <div className="flex gap-8 mb-12">
                    {/* 평점 요약 */}
                    <div className="w-44 h-48 bg-[#f7f7f8] rounded-lg flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold mb-4">{totalRating.toFixed(1)}</div>
                        <div className="text-sm text-[#37383c] opacity-30 mb-4">of {ratingCounts.reduce((a, b) => a + b, 0)} reviews</div>
                        {renderStars(Math.round(totalRating))}
                    </div>

                    {/* 평점 분포 */}
                    <div className="flex-1">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={`rating-dist-${rating}`} className="flex items-center mb-4">
                                <span className="w-3 font-bold mr-4">{rating}</span>
                                <div className="flex-1 relative h-0.5 bg-[#d9d9d9] rounded-full overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-[#ffb547] rounded-full"
                                        style={{
                                            width: `${calculatePercentage(ratingCounts[5 - rating])}%`,
                                        }}
                                    />
                                </div>
                                <span className="ml-4 w-8 text-right text-[#37383c] opacity-60">{ratingCounts[5 - rating]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 리뷰 목록 */}
                <div className="space-y-4">
                    {reviews.slice(0, expanded ? reviews.length : 3).map(review => (
                        <div key={`review-${review.id}`} className="p-6 bg-[#f7f7f8] rounded-lg">
                            <div className="flex gap-4 mb-4">
                                <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">{review.userName}</h3>
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M8 18C9.10457 18 10 17.1046 10 16C10 14.8954 9.10457 14 8 14C6.89543 14 6 14.8954 6 16C6 17.1046 6.89543 18 8 18Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M24 18C25.1046 18 26 17.1046 26 16C26 14.8954 25.1046 14 24 14C22.8954 14 22 14.8954 22 16C22 17.1046 22.8954 18 24 18Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex scale-75 origin-left">{renderStars(review.rating)}</div>
                                        <span className="text-xs text-[#37383c] opacity-30">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-[#2e2f33] opacity-90">{review.content}</p>

                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 mt-4">
                                    {review.images.map((image, index) => (
                                        <div key={`review-img-${review.id}-${index}`} className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                                            <img src={image} alt={`리뷰 이미지 ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 더보기/접기 버튼 */}
                {reviews.length > 3 && (
                    <div className="flex justify-center mt-8">
                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className="px-8 py-3 border border-black rounded-lg font-semibold text-sm flex items-center gap-2 cursor-pointer"
                        >
                            {expanded ? "리뷰 접기" : "전체 리뷰 보기"}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            >
                                <path d="M8 10L4 6H12L8 10Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
