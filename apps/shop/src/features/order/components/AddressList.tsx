"use client";

import { useCallback, useEffect, useState } from "react";
import type { AddressType } from "@/src/features/order/types";
import AddressItem from "./AddressItem";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import EditAddress from "./EditAddress";

interface AddressListProps {
    onSelect?: (address: AddressType) => void;
    selectMode?: boolean;
    selectedAddressId?: number;
    addresses: AddressType[];
}

export default function AddressList({ onSelect, selectMode = false, selectedAddressId, addresses }: AddressListProps) {
    // 현재 선택된 목록 표시를 위한 상태값
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
    const onClick = (id: number) => {
        if (addresses) {
            setSelectedAddress(addresses.find(address => address.addressId === id) || null);
        }
    };

    // 변경하기 버튼 클릭 시 부모 컴포넌트에 onSelect 함수 호출
    const handleSumit = useCallback(() => {
        if (selectedAddress) {
            onSelect?.(selectedAddress);
        }
    }, [onSelect, selectedAddress]);

    const { openModal: openEditAddressModal, closeModal: closeEditAddressModal, Modal } = useModal();

    useEffect(() => {
        const selectedAddress = addresses.find(address => address.addressId === selectedAddressId);
        if (selectedAddress) {
            setSelectedAddress(selectedAddress);
        }
    }, [addresses, selectedAddressId]);
    return (
        <div>
            <div className="mb-4">
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
                    <li key={address.addressId}>
                        <AddressItem
                            key={address.addressId}
                            address={address}
                            onClick={onClick}
                            checked={selectedAddress?.addressId === address.addressId}
                            selectMode={selectMode}
                        />
                    </li>
                ))}
            </ul>
            {selectMode && (
                <div className="py-5">
                    <Button size="full" type="button" onClick={handleSumit}>
                        변경하기
                    </Button>
                </div>
            )}
            <Modal title="배송지 추가" onClickClose={closeEditAddressModal}>
                <EditAddress onComplete={closeEditAddressModal} />
            </Modal>
        </div>
    );
}
