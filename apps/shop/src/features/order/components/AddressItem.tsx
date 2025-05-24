"use client";
import type { AddressType } from "../types";
import { Button } from "@/src/shared/components/shared/button";
interface AddressItemProps {
    address: AddressType;
    onClick: (id: number) => void;
    checked: boolean;
}

export default function AddressItem({ address, onClick, checked }: AddressItemProps) {
    return (
        <div className="p-4 border border-gray-200 rounded-2xl" onClick={() => onClick(address.id)}>
            <h4 className="text-lg font-bold">배송지</h4>
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <input type="radio" name={address.name} id={address.name} checked={checked} readOnly />
                        <label htmlFor={address.name}>{address.name}</label>
                    </div>
                    {address.isDefault && <span className="text-sm text-gray-500 bg-gray-100 rounded-sm px-2 py-1">기본 배송지</span>}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">수정</Button>
                    <Button variant="outline">삭제</Button>
                </div>
            </div>
            <div className="text-sm">
                <p>
                    <span>{address.recipientName}</span> | {address.address1} {address.address2}
                </p>
                <p>{address.recipientPhone}</p>
            </div>
        </div>
    );
}
