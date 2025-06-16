import { useModal } from "@/src/shared/hooks/useModal";
import type { OrderStatus } from "../types";
import { useEffect } from "react";
import { Button } from "@/src/shared/components/shared/button";
import { useCancelPayment } from "../../payment/hooks/useCancelPayment";
import { useRefundPayment } from "../../payment/hooks/useRefundPayment";
import { useToast } from "@/src/shared/hooks/useToast";

export const RefundModal = ({
    order,
    onClickClose,
}: { order: { orderNumber: string; orderStatus: OrderStatus; cancelable: boolean; refundable: boolean }; onClickClose: () => void }) => {
    const { openModal, closeModal, Modal } = useModal();
    const { toast, ToastUI } = useToast();
    const { mutate: cancelPayment } = useCancelPayment({
        onSuccess: () => {
            onClickClose();
            closeModal();
        },
        onError: () => {
            toast({ message: "취소 신청에 실패했습니다." });
        },
    });
    const { mutate: refundPayment } = useRefundPayment({
        onSuccess: () => {
            onClickClose();
            closeModal();
        },
    });

    useEffect(() => {
        if (order) {
            openModal();
        }
    }, [order, openModal]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switch (order.orderStatus) {
            case "WAITING_FOR_PAYMENT":
            case "PAID":
                if (order.cancelable) cancelPayment(order.orderNumber);
                break;
            case "SHIPPED":
            case "DELIVERED":
                if (order.refundable) refundPayment(order.orderNumber);
                break;
            default:
                break;
        }
    };

    const handleCloseModal = () => {
        onClickClose();
        closeModal();
    };

    return (
        <Modal title="반품 신청">
            <form onSubmit={handleSubmit}>
                <p className="text-center mt-4">반품 신청을 하시겠습니까?</p>
                <div className="flex gap-2 mt-10">
                    <Button variant="default" className="flex-1" type="submit">
                        반품 신청
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
