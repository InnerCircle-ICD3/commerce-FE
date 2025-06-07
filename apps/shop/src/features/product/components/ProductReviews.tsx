import Link from "next/link";
import type { ReviewType } from "@/src/features/product/types";
import StarIcon from "@/src/features/product/components/StarIcon";

interface RatingDistribution {
    oneStarCount: number;
    twoStarsCount: number;
    threeStarsCount: number;
    fourStarsCount: number;
    fiveStarsCount: number;
}

interface ProductReviewsProps {
    productId: string;
    reviews: ReviewType[];
    reviewStats: {
        averageRating: number;
        ratingDistribution: RatingDistribution;
    };
}

const DEFAULT_REVIEWS_PER_PAGE = 3;

export function ProductReviews({ productId, reviews, reviewStats }: ProductReviewsProps) {
    const renderStars = (rating: number, reviewId: number) => {
        // rating: 0~5, 소수점 1자리 포함

        return (
            <div className="flex">
                {Array.from({ length: 5 }, (_, i) => {
                    let fillPercent = 0;
                    const key = `star-${reviewId}-${i}`;

                    if (rating >= i + 1) {
                        fillPercent = 100; // 별이 꽉 찬 경우
                    } else if (rating > i) {
                        fillPercent = Math.round((rating - i) * 100); // 별이 부분적으로 찬 경우
                    } else {
                        fillPercent = 0; // 별이 비어있는 경우
                    }

                    return <StarIcon key={key} fillPercent={fillPercent} uniqueId={`star-${reviewId}-${i}`} />;
                })}
            </div>
        );
    };

    const calculatePercentage = (count: number) => {
        const totalReviews = Object.values(reviewStats.ratingDistribution).reduce((a, b) => a + b, 0);
        return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    };

    const getRatingCount = (rating: number) => {
        switch (rating) {
            case 5:
                return reviewStats.ratingDistribution.fiveStarsCount;
            case 4:
                return reviewStats.ratingDistribution.fourStarsCount;
            case 3:
                return reviewStats.ratingDistribution.threeStarsCount;
            case 2:
                return reviewStats.ratingDistribution.twoStarsCount;
            case 1:
                return reviewStats.ratingDistribution.oneStarCount;
            default:
                return 0;
        }
    };

    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">리뷰</h2>
                    <Link href={`/product/${productId}/review`} aria-label="모든 리뷰 보기">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 8L20 16L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                <div className="flex gap-8 mb-12">
                    {/* 평점 요약 */}
                    <div className="w-44 h-48 bg-[#f7f7f8] rounded-lg flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold mb-4">{Math.round(reviewStats.averageRating * 10) / 10}</div>
                        <div className="text-sm text-[#37383c] opacity-30 mb-4">
                            of {Object.values(reviewStats.ratingDistribution).reduce((a: number, b: number) => a + b, 0)} reviews
                            {/* of {0} reviews */}
                        </div>
                        {renderStars(Math.round(reviewStats.averageRating * 10) / 10, -1)}
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
                                            width: `${calculatePercentage(getRatingCount(rating))}%`,
                                        }}
                                    />
                                </div>
                                <span className="ml-4 w-8 text-right text-[#37383c] opacity-60">{getRatingCount(rating)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 리뷰 목록 */}
                <div className="space-y-4">
                    {reviews.slice(0, DEFAULT_REVIEWS_PER_PAGE).map(review => (
                        <div key={`review-${review.id}`} className="p-6 bg-[#f7f7f8] rounded-lg">
                            <div className="flex gap-4 mb-4">
                                <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">{review.userName}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex scale-75 origin-left">{renderStars(review.rating, review.id)}</div>
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
                {reviews.length > DEFAULT_REVIEWS_PER_PAGE && (
                    <div className="flex justify-center mt-8">
                        <Link href={`/product/${productId}/review`} aria-label="모든 리뷰 보기">
                            <button
                                type="button"
                                className="px-8 py-3 border border-black rounded-lg font-semibold text-sm flex items-center gap-2 cursor-pointer"
                            >
                                전체 리뷰 보기
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
