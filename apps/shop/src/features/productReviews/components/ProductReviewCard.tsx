"use client";

import { useState } from "react";
import StarRating from "@/src/shared/components/ui/StarRating";
import type { Review } from "@/src/shared/entities/review/types";

interface ProductReviewCardProps {
    review: Review;
}

export default function ProductReviewCard({ review }: ProductReviewCardProps) {
    const [showMenu, setShowMenu] = useState(false);

    const handleEdit = () => {
        setShowMenu(false);
        console.log("리뷰 수정:", review.id);
        // TODO: 리뷰 수정 로직 구현
    };

    const handleDelete = () => {
        setShowMenu(false);
        console.log("리뷰 삭제:", review.id);
        // TODO: 리뷰 삭제 로직 구현
    };

    return (
        <div className="bg-[#f7f7f8] rounded-xl p-4 relative">
            <div className="flex gap-4">
                {/* 프로필 이미지 */}
                {review.profileImage ? (
                    <img src={review.profileImage} alt={`${review.reviewer} 프로필`} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                ) : (
                    <div className="w-14 h-14 bg-gray-300 rounded-full flex-shrink-0" />
                )}

                {/* 콘텐츠 */}
                <div className="flex-1">
                    {/* 제목과 별점 */}
                    <div className="mb-4">
                        <h3 className="text-base font-bold text-black mb-2">{review.reviewer}</h3>
                        <div className="flex items-center justify-between">
                            <StarRating rating={review.rating} />
                            <span className="text-xs text-[#37383c]/30 font-normal">{review.date}</span>
                        </div>
                    </div>

                    {/* 리뷰 내용 */}
                    <p className="text-sm text-[#2e2f33]/90 mb-4">{review.content}</p>

                    {/* 이미지들 (필요시) */}
                    {review.images && review.images.length > 0 && (
                        <div className="flex gap-2">
                            {review.images.map(image => (
                                <img key={image} src={image} alt="리뷰 이미지" className="w-20 h-20 rounded-lg object-cover" />
                            ))}
                        </div>
                    )}
                </div>

                {/* 더보기 메뉴 */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-6 h-6 flex items-center justify-center text-black"
                        aria-label="리뷰 옵션"
                    >
                        <svg width="3" height="15" viewBox="0 0 3 15" fill="none" aria-hidden="true">
                            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
                            <circle cx="1.5" cy="7.5" r="1.5" fill="currentColor" />
                            <circle cx="1.5" cy="13.5" r="1.5" fill="currentColor" />
                        </svg>
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-8 bg-white border border-[#70737c]/20 rounded-lg shadow-lg z-10 w-[7.5rem]">
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="block w-full h-9 px-4 text-left text-sm text-black bg-[#257a57]/5 hover:bg-[#257a57]/10 whitespace-nowrap"
                            >
                                수정
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="block w-full h-9 px-4 text-left text-sm text-black hover:bg-gray-50 whitespace-nowrap"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
