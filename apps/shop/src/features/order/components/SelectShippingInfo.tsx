"use client";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import AddressList from "./AddressList";
import type { AddressType } from "@/src/features/order/types";
import SelectDeliveryMessage from "./SelectDeliveryMessage";
import { useEffect, useState } from "react";
import { useAddressQuery } from "../hooks/useAddressesQuery";

interface SelectShippingInfoProps {
    shipingInfo: Omit<AddressType, "addressId">;
    onChangeAddress: (address: AddressType) => void;
    onChangeDeliveryMessage: (message: string) => void;
}
export default function SelectShippingInfo({ shipingInfo, onChangeDeliveryMessage, onChangeAddress }: SelectShippingInfoProps) {
    const { openModal, closeModal, Modal } = useModal();
    const { addresses } = useAddressQuery();

    const handleChangeAddress = (address: AddressType) => {
        onChangeAddress(address);
        closeModal();
    };

    return (
        <div className="p-4 border border-gray-200 rounded-2xl">
            <h4 className="text-lg font-bold">배송지</h4>
            {addresses.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base">{shipingInfo?.alias}</h3>
                            {shipingInfo?.isDefault && <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>}
                        </div>
                        <Button variant="outline" onClick={openModal}>
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
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">배송지를 추가해주세요.</p>
                </div>
            )}
            <Modal title="배송지 변경" onClickClose={closeModal}>
                <AddressList onSelect={handleChangeAddress} selectMode={true} />
            </Modal>
        </div>
    );
}
