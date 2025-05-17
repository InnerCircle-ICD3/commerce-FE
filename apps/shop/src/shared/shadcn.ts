import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva as _cva, type VariantProps as _VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const cva = _cva;
export type VariantProps<T extends (...args: Record<string, unknown>[]) => unknown> = _VariantProps<T>;
