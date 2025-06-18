import { cn } from "@/lib/utils";
import * as React from "react";
import { createContext, useContext, useState } from "react";

type SidebarProviderState = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
};

const SidebarContext = createContext<SidebarProviderState>({
    open: true,
    setOpen: () => null,
    toggle: () => null,
});

interface SidebarProviderProps {
    defaultOpen?: boolean;
    children: React.ReactNode;
}

export function SidebarProvider({ defaultOpen = true, children }: SidebarProviderProps) {
    const [open, setOpen] = useState<boolean>(defaultOpen);

    const toggle = React.useCallback(() => {
        const newState = !open;
        setOpen(newState);
    }, [open]);

    const value = React.useMemo<SidebarProviderState>(() => ({ open, setOpen, toggle }), [open, toggle]);

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export const useSidebar = () => {
    return useContext(SidebarContext);
};

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsible?: "icon" | "full" | false;
    variant?: "floating" | "static";
}

export function Sidebar({ className, collapsible = false, variant = "floating", ...props }: SidebarProps) {
    const { open } = useSidebar();

    return (
        <div
            data-state={open ? "expanded" : "collapsed"}
            className={cn(
                "peer fixed inset-y-0 z-10 flex h-screen flex-col border-r bg-white transition-all duration-300 dark:bg-zinc-950",
                open
                    ? "w-[--sidebar-width] max-w-xs translate-x-0"
                    : collapsible === "icon"
                      ? "w-[--sidebar-width-icon] translate-x-0"
                      : "w-[--sidebar-width] -translate-x-full",
                variant === "floating" && "border-0 shadow-lg",
                className,
            )}
            style={
                {
                    "--sidebar-width": "280px",
                    "--sidebar-width-icon": "64px",
                } as React.CSSProperties
            }
            {...props}
        />
    );
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
    return <div className={cn("flex h-16 items-center px-4", className)} {...props} />;
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
    return <div className={cn("flex flex-1 flex-col overflow-hidden", className)} {...props} />;
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
    return <div className={cn("px-4 py-2", className)} {...props} />;
}

export interface SidebarRailProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function SidebarRail({ ...props }: SidebarRailProps) {
    const { toggle } = useSidebar();

    return (
        <button
            type="button"
            aria-label="Toggle sidebar"
            className="absolute -right-4 top-8 z-40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white text-sm hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-950"
            onClick={toggle}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
            >
                <title>사이드바 토글</title>
                <path d="M8 3 L16 12 L8 21" />
            </svg>
        </button>
    );
}
