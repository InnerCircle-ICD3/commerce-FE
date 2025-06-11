"use client";
import type { AddressType } from "@/src/features/order/types";
import { Button } from "@/src/shared/components/shared/button";
import { useModal } from "@/src/shared/hooks/useModal";
import EditAddress from "./EditAddress";
import { useDeleteAddress } from "../hooks/useDeleteAddress";
interface AddressItemProps {
    address: AddressType;
    onClick: (id: number) => void;
    checked: boolean;
    selectMode?: boolean;
}

export default function AddressItem({ address, onClick, checked, selectMode = false }: AddressItemProps) {
    const { openModal, closeModal, Modal } = useModal();

    const { mutate, isPending } = useDeleteAddress({
        onSuccess: () => {
            closeModal();
        },
    });

    return (
        <div className="p-4 border border-gray-200 rounded-2xl" onClick={() => onClick(address.addressId)}>
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        {selectMode && <input type="radio" name={address.alias} id={address.alias} checked={checked} readOnly />}
                        <label htmlFor={address.alias}>{address.alias}</label>
                    </div>
                    {address.isDefault && <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" type="button" onClick={openModal}>
                        수정
                    </Button>
                    <Button variant="outline" type="button" onClick={() => mutate(address.addressId)} disabled={isPending}>
                        삭제
                    </Button>
                </div>
            </div>
            <div className="text-sm">
                <p>
                    <span>{address.recipientName}</span> | {address.address1} {address.address2}
                </p>
                <p>{address.recipientPhone}</p>
            </div>
            <Modal title="배송지 수정" onClickClose={closeModal}>
                <EditAddress onComplete={closeModal} address={address} />
            </Modal>
        </div>
    );
}
