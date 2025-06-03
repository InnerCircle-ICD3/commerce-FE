"use client";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import AddressList from "./AddressList";
import type { AddressType } from "@/src/features/order/types";
import SelectDeliveryMessage from "./SelectDeliveryMessage";
import { useState } from "react";

interface SelectShippingInfoProps {
    addresses: AddressType[];
}
export default function SelectShippingInfo({ addresses }: SelectShippingInfoProps) {
    const { openModal, closeModal, Modal } = useModal();

    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(addresses.find(address => address.isDefault) || null);

    const handleChangeAddress = (address: AddressType) => {
        setSelectedAddress(address);
        closeModal();
    };

    return (
        <div className="p-4 border border-gray-200 rounded-2xl">
            <input type="text" name="addressId" value={selectedAddress?.id} className="hidden" readOnly />
            <h4 className="text-lg font-bold">배송지</h4>
            {addresses.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base">{selectedAddress?.alias}</h3>
                            {selectedAddress?.isDefault && (
                                <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>
                            )}
                        </div>
                        <Button variant="outline" onClick={openModal}>
                            배송지 변경
                        </Button>
                    </div>
                    <div className="text-sm">
                        <p>
                            <span>{selectedAddress?.recipientName}</span> | {selectedAddress?.address1} {selectedAddress?.address2}
                        </p>
                        <p>{selectedAddress?.recipientPhone}</p>
                    </div>
                    <div className="mt-4">
                        <SelectDeliveryMessage />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">배송지를 추가해주세요.</p>
                </div>
            )}
            <Modal title="배송지 변경" onClickClose={closeModal}>
                <AddressList addresses={addresses} onSelect={handleChangeAddress} currentAddress={selectedAddress} />
            </Modal>
        </div>
    );
}
