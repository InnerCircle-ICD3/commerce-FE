"use client";

import { useCallback, useState } from "react";
import type { AddressType } from "../types";
import AddressItem from "./AddressItem";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import EditAddress from "./EditAddress";

interface AddressListProps {
    addresses: AddressType[];
    onSelect: (address: AddressType) => void;
    currentAddress?: AddressType;
}

export default function AddressList({ addresses, onSelect, currentAddress }: AddressListProps) {
    // 현재 선택된 목록 표시를 위한 상태값
    const [selectedAddress, setSelectedAddress] = useState<AddressType>(currentAddress || addresses[0]);
    const onClick = (id: number) => {
        const address = addresses.find(address => address.id === id);
        if (address) {
            setSelectedAddress(address);
        }
    };

    // 변경하기 버튼 클릭 시 부모 컴포넌트에 onSelect 함수 호출
    const handleSumit = useCallback(() => {
        onSelect(selectedAddress);
    }, [onSelect, selectedAddress]);

    const { openModal: openEditAddressModal, closeModal: closeEditAddressModal, Modal } = useModal();

    return (
        <div>
            <div className="mb-4">
                {/* TODO: 배송지 추가 버튼 클릭 시 모달 추가 or 이동 */}
                <Button
                    variant="outline"
                    size="full"
                    onClick={() => {
                        openEditAddressModal();
                    }}
                >
                    배송지 추가하기
                </Button>
            </div>
            <ul className="flex flex-col gap-5">
                {addresses.map(address => (
                    <li key={address.id}>
                        <AddressItem key={address.id} address={address} onClick={onClick} checked={selectedAddress.id === address.id} />
                    </li>
                ))}
            </ul>
            <div className="py-5">
                <Button size="full" onClick={handleSumit}>
                    변경하기
                </Button>
            </div>
            <Modal title="배송지 추가" onClickClose={closeEditAddressModal}>
                <EditAddress onComplete={closeEditAddressModal} />
            </Modal>
        </div>
    );
}
