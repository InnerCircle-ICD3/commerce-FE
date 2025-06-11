import { useQuery } from "@tanstack/react-query";
import { type CustomError, fetchClient } from "@/src/shared/fetcher";
import type { GetCartResponse } from "@/src/features/cart/types/cart";

export function useCart() {
    return useQuery<GetCartResponse>({
        queryKey: ["cart"],
        queryFn: () => fetchCart(),
    });
}

async function fetchCart(): Promise<GetCartResponse> {
    const fetch = fetchClient();

    try {
        const res = await fetch<GetCartResponse>("/carts");

        if (!res.data) {
            throw new Error("카트 데이터를 불러올 수 없습니다");
        }

        return res.data;
    } catch (e) {
        const err = e as CustomError;
        if (err.code && err.message) {
            throw new Error(`${err.code} - ${err.message}`);
        }

        throw new Error("카트 정보를 가져오는 중 오류가 발생했습니다.");
    }
}
