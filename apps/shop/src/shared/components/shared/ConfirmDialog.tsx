import type { ReactNode } from "react";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({ open, title, description, confirmText = "확인", cancelText, onConfirm, onCancel }: ConfirmDialogProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-100 backdrop-blur-sm">
            <dialog
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-full size-fit bg-white border border-gray-200 shadow-xl rounded-2xl px-16 py-8 flex flex-col items-center"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <div className="text-lg font-bold text-[#257A57] mb-2 text-center">{title}</div>
                <div className="text-gray-700 text-center mb-6 text-base">{description}</div>
                <div className="flex gap-3 w-full justify-center mx-8">
                    {cancelText && (
                        <button
                            type="button"
                            className="flex-1 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
                            onClick={onCancel}
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        type="button"
                        className="flex-1 py-2 rounded bg-[#257A57] text-white font-semibold hover:bg-[#1f5c44] transition"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </dialog>
        </div>
    );
}
