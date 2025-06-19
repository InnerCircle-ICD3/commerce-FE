import type { OrderListItem } from "../types/orderListItem";
import Image from "next/image";
import Link from "next/link";
import { getOrderStatusLabel } from "@/src/shared/utils/getOrderStatusLabel";
import { formatCurrency } from "@/src/shared/utils/formatUtils";
import { Button } from "@/src/shared/components/shared/button";
import { ArrowIcon } from "@/src/shared/components/shared/Icon";
import { useModal } from "@/src/shared/hooks/useModal";
import { ShippingTracking } from "./ShippingTracking";

interface OrderHistoryItemProps {
    order: OrderListItem;
    onClickCancelOrder: (order: OrderListItem) => void;
}

export const OrderHistoryItem = ({ order, onClickCancelOrder }: OrderHistoryItemProps) => {
    const { openModal, closeModal, Modal } = useModal();

    return (
        <div key={order.orderNumber} className="w-full p-6 border border-gray-300/30 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-base">{getOrderStatusLabel(order.orderStatus)}</span>
                    {order?.orderedAt && <span className="text-emerald-700 text-sm">{order.orderedAt}</span>}
                </div>
                <Link href={`/order/${order.orderNumber}`}>
                    <button type="button" className="p-1.5">
                        <ArrowIcon direction="right" title="주문 상세 보기" />
                    </button>
                </Link>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                    <Image src={order.mainProductThumbnail} alt={`${order.orderName} 이미지`} fill sizes="5rem" className="object-cover" />
                </div>
                <div className="flex flex-col justify-between">
                    <h3 className="font-bold text-sm">{order.orderName}</h3>
                    <div className="text-emerald-700 font-bold text-sm">{formatCurrency(order.finalTotalPrice)}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {order.cancellable && (
                    <Button variant="outline" className="w-full" onClick={() => onClickCancelOrder(order)}>
                        주문 취소
                    </Button>
                )}
                {order.trackingNumber && (
                    <Button variant="outline" className="w-full bg-emerald-700 text-white" onClick={() => openModal()}>
                        배송 조회
                    </Button>
                )}

                {/* <Button
                key={`${order.orderName}-${button.text}`}
                variant={button.variant}
                className={buttonStyle({ color: button.isGreen ? "green" : "default" })}
                onClick={button.onClick}
                type="button"
            >
                {button.text}
            </Button> */}
            </div>
            {order.trackingNumber && (
                <Modal title="배송 조회" onClickClose={closeModal}>
                    <ShippingTracking trackingNumber={order.trackingNumber} />
                </Modal>
            )}
        </div>
    );
};
