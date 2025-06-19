"use client";

import { OrderHistoryList } from "./OrderHistoryList";
import { ArrowIcon, FilterIcon } from "@/src/shared/components/shared/Icon";
import { useModal } from "@/src/shared/hooks/useModal";
import { useRouter } from "next/navigation";
import { OrderFilter } from "./OrderFilter";
import type { OrderStatus } from "../types";
import { useState } from "react";

export const OrderHistoryPage = () => {
    const router = useRouter();
    const { Modal, openModal, closeModal } = useModal();
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<3 | 6 | 12 | null>(null);
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
                <button type="button" className="p-1" onClick={() => router.back()}>
                    <ArrowIcon direction="left" size="lg" strokeWidth={2} title="뒤로 가기" />
                </button>
                <h1 className="text-2xl font-bold">주문내역</h1>
            </div>
            <div className="mb-6">
                {/* <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <SearchIcon title="검색" />
                    </div>
                    <input
                        type="text"
                        placeholder="구매한 상품명을 입력하세요."
                        className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-xl text-sm outline-none"
                    />
                </div> */}

                <div>
                    <button
                        type="button"
                        className="h-10 px-4 border border-gray-300/30 rounded text-base flex items-center gap-2"
                        onClick={openModal}
                    >
                        필터
                        <FilterIcon title="필터" />
                    </button>
                </div>
            </div>
            <OrderHistoryList status={selectedStatus} period={selectedPeriod} />
            <Modal title="필터">
                <OrderFilter
                    status={selectedStatus}
                    period={selectedPeriod}
                    onApply={(status, period) => {
                        setSelectedStatus(status);
                        setSelectedPeriod(period);
                        closeModal();
                    }}
                />
            </Modal>
        </div>
    );
};
