"use client";

import { cva } from "class-variance-authority";
import type { ProductCategoryType } from "../types";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/src/shared/components/shared/button";

interface ProductFilterProps {
    intensities: string[];
    cupSizes: string[];
    onChange?: (filter: {
        intensity: string | null;
        cupSize: string | null;
    }) => void;
}
export function ProductFilter({ intensities, cupSizes, onChange }: ProductFilterProps) {
    const [filter, setFilter] = useState<{
        intensity: string | null;
        cupSize: string | null;
    }>({
        intensity: null,
        cupSize: null,
    });

    const searchParams = useSearchParams();

    const params = useMemo(() => {
        const newParams = new URLSearchParams(searchParams);

        if (filter.intensity) {
            newParams.set("intensity", filter.intensity);
        }

        if (filter.cupSize) {
            newParams.set("cupSize", filter.cupSize);
        }

        return newParams.toString();
    }, [filter, searchParams]);

    useEffect(() => {
        onChange?.(filter);
    }, [filter, onChange]);

    return (
        <div className="p-4">
            <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">커피 강도</h3>
                <div className="flex gap-x-2">
                    {intensities.map(intensity => {
                        return (
                            <button
                                key={intensity}
                                type="button"
                                onClick={() => {
                                    setFilter(prev => ({
                                        ...prev,
                                        intensity,
                                    }));
                                }}
                                className={filterButton({
                                    active: filter.intensity === intensity,
                                })}
                            >
                                {intensity}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">컵 사이즈</h3>
                <div className="flex gap-x-2">
                    {cupSizes.map(cupSize => {
                        return (
                            <button
                                key={cupSize}
                                type="button"
                                onClick={() => {
                                    setFilter(prev => ({
                                        ...prev,
                                        cupSize,
                                    }));
                                }}
                                className={filterButton({
                                    active: filter.cupSize === cupSize,
                                })}
                            >
                                {cupSize}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Button type="button" asChild size="full" color="primary">
                <Link
                    href={{
                        query: params,
                    }}
                >
                    검색
                </Link>
            </Button>
        </div>
    );
}

const filterButton = cva("py-2 px-4 rounded-sm border", {
    variants: {
        active: {
            true: "border-black text-black font-medium",
            false: "border-gray-300 text-gray-600",
        },
    },
});
