import type { ReactNode } from "react";
import { cva, type VariantProps } from "@/src/shared/shadcn";

const badgeVariants = cva("inline-block px-2.5 py-1.5 text-xs text-center rounded-md whitespace-nowrap mr-1 mb-1", {
    variants: {
        variant: {
            default: "bg-neutral-700 bg-opacity-20 text-neutral-900",
            yellow: "bg-yellow-400 text-neutral-900",
            purple: "bg-purple-800 text-white",
            red: "bg-red-800 text-white",
            green: "bg-green-700 text-white",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface BadgeProps extends VariantProps<typeof badgeVariants> {
    children: ReactNode;
}

export const Badge = ({ variant = "default", children }: BadgeProps) => {
    return <span className={badgeVariants({ variant })}>{children}</span>;
};
