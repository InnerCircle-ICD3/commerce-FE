import { useModal } from "@/src/shared/hooks/useModal";
import { useEffect } from "react";
import { Button } from "@/src/shared/components/shared/button";
import { useToast } from "@/src/shared/hooks/useToast";
import { useCancelOrder } from "../hooks/useCancelOrder";

export const CancelOrderModal = ({ order, onClickClose }: { order: { orderNumber: string }; onClickClose: () => void }) => {
    const { openModal, closeModal, Modal } = useModal();
    const { toast, ToastUI } = useToast();

    const { mutate: cancelOrder } = useCancelOrder({
        onSuccess: () => {
            onClickClose();
            closeModal();
        },
        onError: () => {
            toast({ message: "주문 취소에 실패했습니다." });
        },
    });

    useEffect(() => {
        if (order) {
            openModal();
        }
    }, [order, openModal]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cancelOrder(order.orderNumber);
    };

    const handleCloseModal = () => {
        onClickClose();
        closeModal();
    };

    return (
        <Modal title="주문 취소" onClickClose={handleCloseModal}>
            <form onSubmit={handleSubmit}>
                <p className="text-center mt-4">주문 취소를 하시겠습니까?</p>
                <div className="flex gap-2 mt-10">
                    <Button variant="default" className="flex-1" type="submit">
                        주문 취소
                    </Button>
                    <Button variant="outline" className="flex-1" type="button" onClick={handleCloseModal}>
                        취소
                    </Button>
                </div>
            </form>
            {ToastUI}
        </Modal>
    );
};
