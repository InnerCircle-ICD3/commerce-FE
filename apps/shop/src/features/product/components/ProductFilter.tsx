"use client";

import { cva } from "class-variance-authority";
import type { ProductCategoryType } from "../types";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/src/shared/components/shared/button";

interface ProductFilterProps {
    intensities: ProductCategoryType[];
    cupSizes: ProductCategoryType[];
    onChange?: (filter: {
        intensity: ProductCategoryType | null;
        cupSize: ProductCategoryType | null;
    }) => void;
}
export function ProductFilter({
    intensities,
    cupSizes,
    onChange,
}: ProductFilterProps) {
    const [filter, setFilter] = useState<{
        intensity: ProductCategoryType | null;
        cupSize: ProductCategoryType | null;
    }>({
        intensity: null,
        cupSize: null,
    });

    const searchParams = useSearchParams();

    const params = useMemo(() => {
        const newParams = new URLSearchParams(searchParams);

        if (filter.intensity) {
            newParams.set("intensityId", filter.intensity.id.toString());
        }

        if (filter.cupSize) {
            newParams.set("cupSizeId", filter.cupSize.id.toString());
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
                                key={intensity.id}
                                type="button"
                                onClick={() => {
                                    setFilter(prev => ({
                                        ...prev,
                                        intensity,
                                    }));
                                }}
                                className={filterbutton({
                                    active:
                                        filter.intensity?.id === intensity.id,
                                })}
                            >
                                {intensity.label}
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
                                key={cupSize.id}
                                type="button"
                                onClick={() => {
                                    setFilter(prev => ({
                                        ...prev,
                                        cupSize,
                                    }));
                                }}
                                className={filterbutton({
                                    active: filter.cupSize?.id === cupSize.id,
                                })}
                            >
                                {cupSize.label}
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

const filterbutton = cva("py-2 px-4 rounded-sm border", {
    variants: {
        active: {
            true: "border-black text-black font-medium",
            false: "border-gray-300 text-gray-600",
        },
    },
});
