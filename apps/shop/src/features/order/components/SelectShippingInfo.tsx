"use client";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import { useEffect } from "react";
import AddAddress from "./AddAddress";

export default function SelectShippingInfo() {
    const { openModal, closeModal, Modal } = useModal();

    // TODO: 배송지 정보 가져오기
    const address = {
        id: 1,
        name: "집",
        address1: "서울특별시 강남구 테헤란로 14길 6",
        address2: "남도빌딩 2층 201호",
        phone: "010-1234-5678",
        recipient_name: "김팔공",
        isDefault: true,
    };
    return (
        <div className="p-4 border border-gray-200 rounded-2xl">
            <h4 className="text-lg font-bold">배송지</h4>
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold">{address.name}</h3>
                    {address.isDefault && <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>}
                </div>
                <Button variant="outline" onClick={openModal}>
                    배송지 변경
                </Button>
            </div>
            <div className="text-sm">
                <p>
                    <span>{address.recipient_name}</span> | {address.address1} {address.address2}
                </p>
                <p>{address.phone}</p>
            </div>
            <div>
                <div>TODO: 배송 메시지</div>
            </div>
            <Modal title="배송지 변경" onClickClose={closeModal}>
                <AddAddress />
            </Modal>
        </div>
    );
}
