import Image from "next/image";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClickClose?: () => void;
}
export const Modal = ({
    title,
    children,
    isOpen,
    onClickClose,
}: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg">
                <div className="w-150 py-4 px-6 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <div
                        className="cursor-pointer"
                        onClick={onClickClose}
                        aria-label="close"
                    >
                        <Image
                            src="/images/close.svg"
                            alt="close"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
                <div className="py-4 px-6">{children}</div>
            </div>
        </div>
    );
};
