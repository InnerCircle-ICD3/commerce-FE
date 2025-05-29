"use client";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import AddressList from "./AddressList";
import type { AddressType } from "../types";
import { useState } from "react";
import SelectDeliveryMessage from "./SelectDeliveryMessage";
import EditAddress from "./EditAddress";

export default function SelectShippingInfo() {
    const { openModal, closeModal, Modal } = useModal();

    const [selectedAddressId, setSelectedAddressId] = useState<number>(1);

    const handleChangeAddress = (address: AddressType) => {
        setSelectedAddressId(address.id);
        closeModal();
    };
    // TODO: 배송지 정보 가져오기
    const addressList: AddressType[] = [
        {
            id: 1,
            alias: "집",
            address1: "서울특별시 강남구 테헤란로 14길 6",
            address2: "남도빌딩 2층 201호",
            recipientPhone: "010-1111-1111",
            recipientName: "김팔공",
            isDefault: true,
            zipCode: "12345",
        },
        {
            id: 2,
            alias: "회사",
            address1: "경기도 성남시 분당구 판교로 245  ",
            address2: "판교래미안포레스트 111동 101호",
            recipientPhone: "010-1111-1111",
            recipientName: "황보석",
            isDefault: false,
            zipCode: "12345",
        },
    ];

    const address = addressList.find(address => address.id === selectedAddressId);

    return (
        <div className="p-4 border border-gray-200 rounded-2xl">
            {/* server action에서 값을 읽기 위해 추가. 숨김처리 */}
            <input
                type="text"
                name="selectedAddressId"
                id="selectedAddressId"
                placeholder="배송 메시지"
                className="hidden"
                value={selectedAddressId}
                readOnly
            />
            <h4 className="text-lg font-bold">배송지</h4>
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{address?.alias}</h3>
                    {address?.isDefault && <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>}
                </div>
                <Button variant="outline" onClick={openModal}>
                    배송지 변경
                </Button>
            </div>
            <div className="text-sm">
                <p>
                    <span>{address?.recipientName}</span> | {address?.address1} {address?.address2}
                </p>
                <p>{address?.recipientPhone}</p>
            </div>
            <div className="mt-4">
                <SelectDeliveryMessage />
            </div>
            <Modal title="배송지 변경" onClickClose={closeModal}>
                <AddressList addresses={addressList} onSelect={handleChangeAddress} currentAddress={address} />
            </Modal>
        </div>
    );
}
