import type { AdminReply } from "@/features/review/types/type";
import { EditIcon, TrashIcon } from "@/shared/components/shared/Icon";
import { fetcher } from "@/shared/kyInstance";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ReplyProps {
    //todo: replyId가 필요한지 확인하기
    reply: AdminReply;
    reviewId: number;
}

export default function Reply({ reply, reviewId }: ReplyProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(reply.content);
    const queryClient = useQueryClient();

    const handleEdit = () => {
        setIsEditing(true);
        setEditContent(reply.content);
    };

    const handleSaveEdit = () => {
        if (editContent.trim()) {
            requestEdit(editContent.trim());
            setIsEditing(false);
        }
    };

    const requestEdit = async (content: string) => {
        fetcher(`admin/reviews/${reviewId}/reply`, {
            method: "PUT",
            json: { content },
        })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["reviews"] }); // 리뷰 목록을 새로고침
            })
            .catch(error => {
                console.error("답변 수정 실패:", error);
                alert("답변 수정에 실패했습니다. 나중에 다시 시도해주세요.");
            });
    };

    const handleCancelEdit = () => {
        setEditContent(reply.content);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm("정말로 답변을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            requestDelete();
        }
    };

    const requestDelete = async () => {
        fetcher(`admin/reviews/${reviewId}/reply`, {
            method: "DELETE",
        })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["reviews"] }); // 리뷰 목록을 새로고침
            })
            .catch(error => {
                console.error("답변 삭제 실패:", error);
                alert("답변 삭제에 실패했습니다. 나중에 다시 시도해주세요.");
            });
    };

    return (
        <div className="p-6 bg-green-50">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-green-800">관리자 답변</h4>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                답변 완료
                            </span>
                        </div>
                        {!isEditing && (
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    title="답변 수정"
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    title="답변 삭제"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="space-y-3">
                            <textarea
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-green-700"
                                placeholder="답변을 수정해주세요..."
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    disabled={!editContent.trim()}
                                    className="px-3 py-1 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-green-700 leading-relaxed">{reply.content}</p>
                            <div className="mt-3 text-xs text-green-600">
                                {new Date(reply.createdAt).toLocaleDateString("ko-KR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                에 답변
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
