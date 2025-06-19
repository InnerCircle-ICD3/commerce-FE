import type { Review } from "@/features/review/types/type";
import { TableCell, TableRow } from "@/shared";
import { createStars } from "@/shared/utils/createStars";
import Reply from "./Reply";
import ReplyPending from "./ReplyPending";

export default function ReviewDetail({ review }: { review: Review }) {
    return (
        <TableRow className="bg-gray-50">
            <TableCell colSpan={7} className="p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {/* 리뷰 내용 섹션 */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-sm font-semibold text-gray-900">고객 리뷰</h4>
                                    <div className="flex items-center gap-1">
                                        <span className="text-lg text-yellow-400">{createStars(review.rating)}</span>
                                        <span className="text-sm text-gray-500">({review.rating}/5)</span>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.content}</p>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span>{review.user.nickname}</span>
                                    <span>•</span>
                                    <span>
                                        {new Date(review.createdAt).toLocaleDateString("ko-KR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 관리자 답변 섹션 */}
                    {review.adminReply ? <Reply reviewId={review.reviewId} reply={review.adminReply} /> : <ReplyPending reviewId={review.reviewId} />}
                </div>
            </TableCell>
        </TableRow>
    );
}
