"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type MonthRange = "3" | "6" | "12" | "all";
const monthRangeLabels: Record<MonthRange, string> = {
    "3": "최근 3개월",
    "6": "최근 6개월",
    "12": "최근 1년",
    all: "전체",
};
const monthRanges = Object.keys(monthRangeLabels) as MonthRange[];

export default function ReviewFilter() {
    const router = useRouter();
    const params = useSearchParams();

    const [value, setValue] = useState<MonthRange>("3");

    const changeMonthRange = (monthRange: MonthRange) => {
        const newParams = new URLSearchParams(params.toString());

        newParams.set("monthRange", monthRange);
        router.replace(`/review/my?${newParams.toString()}`);

        setValue(monthRange);
    };

    return (
        <div className="flex gap-2 mb-6">
            {monthRanges.map(monthRange => (
                <button
                    key={monthRange}
                    type="button"
                    onClick={() => changeMonthRange(monthRange)}
                    className={`px-4 py-2 rounded ${value === monthRange ? "bg-[#257A57] text-white" : "bg-gray-100 text-black"}`}
                >
                    {monthRangeLabels[monthRange]}
                </button>
            ))}
        </div>
    );
}
