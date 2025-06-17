import StarRating from "@/src/shared/components/ui/StarRating";
import type { ReviewType } from "@/src/shared/entities/review/types";

interface ProductReviewCardProps {
    review: ReviewType;
}

export default function ProductReviewCard({ review }: ProductReviewCardProps) {
    return (
        <div className="bg-[#f7f7f8] rounded-xl p-4 relative px-6">
            <div className="flex gap-4">
                {/* 콘텐츠 */}
                <div className="flex flex-col justify-center">
                    {/* 제목과 별점 */}
                    <div className="mb-4">
                        <h3 className="text-base font-bold text-black mb-2">{review.user.nickname}</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <StarRating rating={review.rating} />
                                <span className="text-xs text-[#37383c]/30 font-normal">{review.createdAt}</span>
                            </div>
                        </div>
                    </div>
                    {/* 리뷰 내용 */}
                    <p className="text-sm text-[#2e2f33]/90">{review.content}</p>
                    {/* 이미지들 (필요시) */}
                    {/* {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-3">
                            {review.images.map(image => (
                                <img key={image} src={image} alt="리뷰 이미지" className="w-20 h-20 rounded-lg object-cover" />
                            ))}
                        </div>
                    )} */}
                    {/* 관리자 답변 */}
                    {review.adminReply?.content && (
                        <div className="mt-4 bg-white rounded-lg p-4 border-l-4 border-[#257a57]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-[#257a57] text-white text-xs px-2 py-1 rounded-full font-medium">관리자 답변</div>
                                <span className="text-xs text-gray-500">{review.adminReply.createdAt}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{review.adminReply.content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
