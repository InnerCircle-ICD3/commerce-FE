import ReplyWrite from "@/features/review/components/ReplyWrite";
import { fetcher } from "@/shared/kyInstance";
import { useState } from "react";

export default function ReplyPending({ reviewId }: { reviewId: number }) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const reply = () => {
        setIsReplying(true);
    };

    const handleSubmitReply = () => {
        if (replyText.trim()) {
            requestReply();
        }
    };

    const handleCancelReply = () => {
        setReplyText("");
        setIsReplying(false);
    };

    const requestReply = async () => {
        fetcher(`/admin/reviews/${reviewId}/reply`, {
            method: "POST",
        })
            .then(() => {
                setIsReplying(false);
            })
            .catch(error => {
                console.error("답변 요청 실패:", error);
                alert("답변 요청에 실패했습니다. 나중에 다시 시도해주세요.");
            });
    };

    return (
        <div className="p-6 bg-amber-50 border-t border-amber-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-amber-800">답변 대기중</p>
                        <p className="text-xs text-amber-600">고객이 관리자 답변을 기다리고 있습니다.</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={reply}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    답변하기
                </button>
            </div>

            {isReplying && (
                <ReplyWrite setReplyText={setReplyText} replyText={replyText} onReplySubmit={handleSubmitReply} onCancel={handleCancelReply} />
            )}
        </div>
    );
}
