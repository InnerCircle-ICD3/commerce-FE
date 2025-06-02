"use client";
import type { ProductType } from "@/src/features/product/types";
import { Modal } from "@/src/shared/components/shared/Modal";
import Rating from "./Rating";
import { useState } from "react";
import { Button } from "@/src/shared/components/shared/button";
import { formatCurrency } from "@/src/shared/utils/formatUtils";

const MAX_CONTENT_LENGTH = 999;
interface CreateReviewModalProps {
    product: ProductType;
    isOpen: boolean;
    onClickClose: () => void;
}
export default function CreateReviewModal({ product, isOpen, onClickClose }: CreateReviewModalProps) {
    const [rating, setRating] = useState(0);

    const [content, setContent] = useState("");

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > MAX_CONTENT_LENGTH) return;
        setContent(e.target.value);
    };

    const handleClose = () => {
        // TODO: 모달 닫기 확인 팝업
        onClickClose();
    };

    const handleSubmit = () => {
        if (content.length === 0) return;
        onClickClose();
    };

    return (
        <Modal isOpen={isOpen} title="리뷰 작성" onClickClose={handleClose}>
            <div className="flex">
                <div className="w-50 h-40">이미지</div>
                <div>
                    <p className="text-2xl font-bold mb-6">{product.title}</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
                </div>
            </div>
            <div>
                <div className="flex">
                    <h3 className="text-xl fong-bold">
                        제품 만족도<span className="text-[#FF4242]">*</span>
                    </h3>
                    <p>(별점을 눌러 평가해 주세요)</p>
                </div>
                <div className="py-4 bg-gray-100 flex justify-center gap-6 rounded-xl">
                    <Rating rating={rating} onChange={setRating} />
                </div>
            </div>
            <div className="mb-10">
                <div className="flex justify-between mb-4">
                    <h3>구매 후기</h3>
                    <p>
                        <b>{content.length}</b> / {MAX_CONTENT_LENGTH}
                    </p>
                </div>
                <textarea
                    className="resize-none w-full h-80 rounded-xl bg-gray-100 outline-none p-4"
                    placeholder="제품 후기를 남겨주세요"
                    value={content}
                    onChange={handleContentChange}
                />
            </div>
            <Button size="full" onClick={handleSubmit}>
                리뷰 등록하기
            </Button>
        </Modal>
    );
}
