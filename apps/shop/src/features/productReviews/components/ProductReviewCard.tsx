import StarRating from "@/src/shared/components/ui/StarRating";
import type { Review } from "@/src/shared/entities/review/types";

interface ProductReviewCardProps {
    review: Review;
}

export default function ProductReviewCard({ review }: ProductReviewCardProps) {
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
                            <div className="flex gap-2 items-center">
                                <StarRating rating={review.rating} />
                                <span className="text-xs text-[#37383c]/30 font-normal">{review.date}</span>
                            </div>
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
            </div>
        </div>
    );
}
