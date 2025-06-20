"use client";

import { useAddressQuery } from "../hooks/useAddressesQuery";
import AddressList from "./AddressList";

export default function AddressPage() {
    const { addresses, isLoading, error } = useAddressQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="my-16 px-8 py-7">
            <h2 className="mb-4">배송지 관리</h2>

            <AddressList addresses={addresses} />
        </div>
    );
}
