"use client";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import AddressList from "./AddressList";
import type { AddressType } from "@/src/features/order/types";
import SelectDeliveryMessage from "./SelectDeliveryMessage";

interface SelectShippingInfoProps {
    shipingInfo: AddressType | null;
    onChangeAddress: (address: AddressType) => void;
    onChangeDeliveryMessage: (message: string) => void;
    addresses: AddressType[];
}
export default function SelectShippingInfo({ shipingInfo, onChangeDeliveryMessage, onChangeAddress, addresses }: SelectShippingInfoProps) {
    const { openModal, closeModal, Modal } = useModal();

    const handleChangeAddress = (address: AddressType) => {
        onChangeAddress(address);
        closeModal();
    };

    return (
        <div className="p-4 border border-gray-200 rounded-2xl">
            <h4 className="text-lg font-bold">배송지</h4>
            {shipingInfo ? (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base">{shipingInfo?.alias}</h3>
                            {shipingInfo?.isDefault && <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>}
                        </div>
                        <Button variant="outline" onClick={openModal} type="button">
                            배송지 변경
                        </Button>
                    </div>
                    <div className="text-sm">
                        <p>
                            <span>{shipingInfo?.recipientName}</span> | {shipingInfo?.address1} {shipingInfo?.address2}
                        </p>
                        <p>{shipingInfo?.recipientPhone}</p>
                    </div>
                    <div className="mt-4">
                        <SelectDeliveryMessage onChange={onChangeDeliveryMessage} />
                    </div>
                </>
            ) : (
                <div className="text-center py-2">
                    <Button variant="outline" onClick={openModal} type="button" size="full">
                        배송지 선택
                    </Button>
                </div>
            )}
            <Modal title="배송지 변경" onClickClose={closeModal}>
                <AddressList onSelect={handleChangeAddress} selectMode={true} selectedAddressId={shipingInfo?.addressId} addresses={addresses} />
            </Modal>
        </div>
    );
}
