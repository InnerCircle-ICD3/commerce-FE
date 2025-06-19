"use client";
import { Button } from "@/src/shared/components/shared/button";
import type { OrderStatus } from "../types";
import { useState } from "react";
import { getOrderStatus } from "../api/getOrderStatus";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/src/shared/shadcn";

interface OrderFilterProps {
    onApply: (status: OrderStatus | null, period: 3 | 6 | 12 | null) => void;
    status: OrderStatus | null;
    period: 3 | 6 | 12 | null;
}

const periodList: { label: string; value: 3 | 6 | 12 | null }[] = [
    { label: "전체", value: null },
    { label: "3개월", value: 3 },
    { label: "6개월", value: 6 },
    { label: "12개월", value: 12 },
];

export const OrderFilter = ({ onApply, status, period }: OrderFilterProps) => {
    const { data: orderStatusList } = useQuery({
        queryKey: ["orderStatusList"],
        queryFn: () => getOrderStatus(),
    });
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(status);
    const [selectedPeriod, setSelectedPeriod] = useState<3 | 6 | 12 | null>(period);

    const handleStatus = (status: OrderStatus | null) => {
        setSelectedStatus(status);
    };
    const handlePeriod = (period: 3 | 6 | 12 | null) => {
        setSelectedPeriod(period);
    };
    return (
        <>
            <div>
                <h3 className="text-lg font-bold">조회 기간</h3>
                <ul className="flex gap-2 flex-wrap">
                    {periodList.map(item => (
                        <li key={item.value}>
                            <Button
                                variant="outline"
                                onClick={() => handlePeriod(item.value)}
                                className={cn(selectedPeriod === item.value && "bg-primary text-white")}
                            >
                                {item.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-bold">주문상태</h3>
                <ul className="flex gap-2 flex-wrap">
                    <li>
                        <Button
                            variant="outline"
                            onClick={() => handleStatus(null)}
                            className={cn(selectedStatus === null && "bg-primary text-white")}
                        >
                            전체
                        </Button>
                    </li>
                    {orderStatusList?.data?.map(item => (
                        <li key={item.code}>
                            <Button
                                key={item.code}
                                variant="outline"
                                onClick={() => {
                                    handleStatus(item.code);
                                }}
                                className={cn(selectedStatus === item.code && "bg-primary text-white", "w-full")}
                            >
                                {item.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Button variant="default" className="w-full mt-10" onClick={() => onApply(selectedStatus, selectedPeriod)}>
                적용하기
            </Button>
        </>
    );
};
