"use client";

import { Modal } from "@/src/shared/components/shared/Modal";
import Rating from "./Rating";
import { useState } from "react";
import { Button } from "@/src/shared/components/shared/button";
import ConfirmDialog from "@/src/shared/components/shared/ConfirmDialog";
import { fetchClient } from "@/src/shared/fetcher";
import { useToast } from "@/src/shared/hooks/useToast";

const MAX_CONTENT_LENGTH = 999;
interface CreateReviewModalProps {
    isEdit?: boolean;
    reviewInfo?: {
        reviewId: number;
        rating: number;
        content: string;
    };
    product: {
        productId: number;
        title: string;
        imageUrl: string;
    };
    isOpen: boolean;
    onClickClose: () => void;
}
export default function CreateReviewModal({ isEdit = false, reviewInfo, product, isOpen, onClickClose }: CreateReviewModalProps) {
    const [rating, setRating] = useState(isEdit ? reviewInfo?.rating || 0 : 0);
    const [content, setContent] = useState(isEdit ? reviewInfo?.content || "" : "");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { toast, ToastUI } = useToast();

    const fetch = fetchClient();

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > MAX_CONTENT_LENGTH) return;
        setContent(e.target.value);
    };

    const handleClose = () => {
        setIsAlertOpen(true);
    };

    const handleSubmit = () => {
        if (content.length === 0) return;

        isEdit ? editReview() : createReview();
    };

    const createReview = () => {
        fetch("/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: product.productId,
                rating,
                content,
            }),
        })
            .then(() => {
                onClickClose();
            })
            .catch(error => {
                console.error("리뷰 작성 실패:", error);
                toast({
                    message: "리뷰 작성 중 오류가 발생했습니다.",
                });
            });
    };

    const editReview = () => {
        fetch(`/reviews/${reviewInfo?.reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating, content }),
        })
            .then(() => {
                onClickClose();
            })
            .catch(error => {
                console.error("리뷰 수정 실패:", error);
                toast({
                    message: "리뷰 수정 중 오류가 발생했습니다.",
                });
            });
    };

    return (
        <>
            <Modal isOpen={isOpen} title={isEdit ? "리뷰 수정" : "리뷰 작성"} onClickClose={handleClose}>
                <div className="flex gap-4 items-center mx-6 mb-6">
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold mb-2 text-black line-clamp-2">{product.title}</p>
                    </div>
                </div>
                <div className="mb-10">
                    <div className="flex gap-2 items-center mb-4">
                        <h3 className="text-xl font-bold">
                            제품 만족도<span className="text-[#FF4242]">*</span>
                        </h3>
                        <p className="text-gray-400">(별점을 눌러 평가해 주세요)</p>
                    </div>
                    <div className="py-4 bg-gray-100 flex justify-center gap-6 rounded-xl">
                        <Rating rating={rating} onChange={setRating} />
                    </div>
                </div>
                <div className="mb-10">
                    <div className="flex justify-between mb-4 items-center">
                        <h3 className="text-xl font-bold">구매 후기</h3>
                        <p className="text-s text-gray-500">
                            <b className="text-[#257457]">{content.length}</b> / {MAX_CONTENT_LENGTH}
                        </p>
                    </div>
                    <textarea
                        className="resize-none w-full h-60 rounded-xl bg-gray-100 outline-none p-4 text-base text-black"
                        placeholder="제품 후기를 남겨주세요"
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <Button size="full" className="py-4 text-base font-semibold" onClick={handleSubmit}>
                    리뷰 {isEdit ? "수정" : "등록"}하기
                </Button>
            </Modal>
            <ConfirmDialog
                open={isAlertOpen}
                title={`리뷰 ${isEdit ? "수정" : "작성"} 종료`}
                description={
                    <>
                        <span className="block mb-1">작성 중인 내용은 저장되지 않습니다.</span>
                        <span>정말로 종료하시겠습니까?</span>
                    </>
                }
                cancelText="취소"
                confirmText="종료"
                onCancel={() => setIsAlertOpen(false)}
                onConfirm={() => {
                    setIsAlertOpen(false);
                    onClickClose();
                }}
            />
            {ToastUI}
        </>
    );
}
