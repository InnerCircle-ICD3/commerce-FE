"use client";

import { useCallback, useState } from "react";
import type { UserReview } from "@/src/features/myReviews/types";
import { fetchClient } from "@/src/shared/fetcher";
import MyReviewCard from "@/src/features/myReviews/components/MyReviewCard";
import CreateReviewModal from "@/src/features/reviewCreate/components/CreateReviewModal";
import ConfirmDialog from "@/src/shared/components/shared/ConfirmDialog";
import { useToast } from "@/src/shared/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MyReviewListProps {
    reviews: UserReview[];
    hasMore?: boolean;
}

export default function MyReviewList({ reviews, hasMore = false }: MyReviewListProps) {
    const [editingReview, setEditingReview] = useState<UserReview | null>(null);
    const [deletingReviewId, setDeletingReviewId] = useState<number | null>(null);
    const fetch = fetchClient();
    const queryClient = useQueryClient();
    const { toast, ToastUI } = useToast();

    const handleEdit = (review: UserReview) => {
        setEditingReview(review);
    };

    const onDeleteClick = (reviewId: number) => {
        setDeletingReviewId(reviewId);
    };

    const onDeleteConfirm = useCallback(() => {
        if (deletingReviewId === null) return;

        deleteReview.mutate(deletingReviewId);
    }, [deletingReviewId]);

    const deleteReview = useMutation({
        mutationFn: async (reviewId: number) => {
            await fetch(`/reviews/${reviewId}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userReviews"],
                exact: false,
            });
            setDeletingReviewId(null);
            toast({
                message: "리뷰가 삭제되었습니다.",
            });
        },
        onError: (error: unknown) => {
            console.error("리뷰 삭제 실패:", error);

            toast({
                message: "리뷰 삭제 중 오류가 발생했습니다.",
            });
        },
    });

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-gray-400 text-lg mb-2">작성한 리뷰가 없습니다</div>
                <div className="text-gray-500 text-sm">구매하신 상품에 대한 리뷰를 작성해보세요</div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {/* 리뷰 목록 */}
                <div className="space-y-4">
                    {reviews.map(review => (
                        <MyReviewCard
                            key={`review-${review.reviewId}`}
                            review={review}
                            onEdit={handleEdit}
                            onDelete={() => onDeleteClick(review.reviewId)}
                        />
                    ))}
                </div>

                {/* 더보기 버튼 */}
                {hasMore && (
                    <div className="text-center pt-8">
                        <button
                            type="button"
                            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            더보기
                        </button>
                    </div>
                )}
            </div>
            {editingReview && (
                <CreateReviewModal
                    isEdit={true}
                    reviewInfo={{
                        reviewId: editingReview.reviewId,
                        rating: editingReview.rating,
                        content: editingReview.content || "",
                    }}
                    product={{
                        productId: editingReview.productId,
                        title: editingReview.productName,
                        imageUrl: editingReview.productThumbnail || "",
                    }}
                    isOpen={!!editingReview}
                    onClickClose={() => setEditingReview(null)}
                />
            )}
            {deletingReviewId !== null && (
                <ConfirmDialog
                    open={deletingReviewId !== null}
                    title="리뷰 삭제"
                    description="정말로 이 리뷰를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                    confirmText="삭제"
                    cancelText="취소"
                    onConfirm={onDeleteConfirm}
                    onCancel={() => setDeletingReviewId(null)}
                />
            )}
            {ToastUI}
        </>
    );
}
