import { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClickClose?: () => void;
}

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const Modal = ({ title, children, onClickClose }: ModalProps) => {
        if (!isOpen) return null;
        return createPortal(
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
                <div className="bg-white rounded-lg">
                    <div className="min-w-150 py-4 px-6 flex justify-between items-center border-b">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <div className="cursor-pointer" onClick={onClickClose} aria-label="close">
                            <Image src="/images/close.svg" alt="close" width={24} height={24} />
                        </div>
                    </div>
                    <div className="py-4 px-6">{children}</div>
                </div>
            </div>,
            document.body,
        );
    };

    return { isOpen, openModal, closeModal, Modal };
};
