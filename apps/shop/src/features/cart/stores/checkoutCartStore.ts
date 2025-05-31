import { create } from "zustand";
import type { CartItem } from "@/src/features/cart/types/cart";

interface CheckoutCartStore {
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
    clearCartItems: () => void;
}

export const useCheckoutCartStore = create<CheckoutCartStore>(set => ({
    cartItems: [],
    setCartItems: items => set({ cartItems: items }),
    clearCartItems: () => set({ cartItems: [] }),
}));
