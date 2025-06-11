"use client";

import { useCallback, useState } from "react";
import type { AddressType } from "@/src/features/order/types";
import AddressItem from "./AddressItem";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import EditAddress from "./EditAddress";
import { useAddressQuery } from "../hooks/useAddressesQuery";

interface AddressListProps {
    onSelect?: (address: AddressType) => void;
    selectMode?: boolean;
}

export default function AddressList({ onSelect, selectMode = false }: AddressListProps) {
    const { addresses } = useAddressQuery();
    // 현재 선택된 목록 표시를 위한 상태값
    const [selectedAddress, setSelectedAddress] = useState<AddressType>(addresses[0]);
    const onClick = (id: number) => {
        const address = addresses.find(address => address.addressId === id);
        if (address) {
            setSelectedAddress(address);
        }
    };

    // 변경하기 버튼 클릭 시 부모 컴포넌트에 onSelect 함수 호출
    const handleSumit = useCallback(() => {
        onSelect?.(selectedAddress);
    }, [onSelect, selectedAddress]);

    const { openModal: openEditAddressModal, closeModal: closeEditAddressModal, Modal } = useModal();

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
                            checked={selectedAddress.addressId === address.addressId}
                            selectMode={selectMode}
                        />
                    </li>
                ))}
            </ul>
            {selectMode && (
                <div className="py-5">
                    <Button size="full" onClick={handleSumit}>
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
