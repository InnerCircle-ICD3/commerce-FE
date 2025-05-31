"use client";

import Image from "next/image";
import { Star, Edit, Trash2 } from "lucide-react";
import type { UserReview } from "@/src/features/userReview/types";

interface UserReviewCardProps {
    review: UserReview;
    onEdit?: (reviewId: number) => void;
    onDelete?: (reviewId: number) => void;
}

export default function UserReviewCard({ review, onEdit, onDelete }: UserReviewCardProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={`star-${review.reviewId}-${index}`}
                className={`w-4 h-4 ${index < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
            />
        ));
    };

    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
            {/* 상품 정보 */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                        src={review.productThumbnail || "/placeholder.jpg"}
                        alt={review.productName || "상품"}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{review.productName || "상품명 없음"}</h3>
                    <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating || 0)}</div>
                        <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                    </div>
                </div>

                {/* 수정/삭제 버튼 */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => review.reviewId && onEdit?.(review.reviewId)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="리뷰 수정"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => review.reviewId && onDelete?.(review.reviewId)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="리뷰 삭제"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 리뷰 내용 */}
            <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{review.content || "리뷰 내용이 없습니다."}</p>
            </div>

            {/* 관리자 답변 */}
            {review.adminReply && (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600">관리자 답변</span>
                        <span className="text-xs text-gray-500">{formatDate(review.adminReply.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{review.adminReply.content}</p>
                </div>
            )}
        </div>
    );
}
