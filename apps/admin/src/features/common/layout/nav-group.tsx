import { cn } from "@/lib/utils";
import { useSidebar } from "@/shared/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    variant?: string;
}

export interface NavGroupProps {
    title?: string;
    items: NavItem[];
}

export function NavGroup({ title, items }: NavGroupProps) {
    const { open } = useSidebar();

    return (
        <div className="py-2">
            {title && open && <h2 className="mb-2 px-4 text-xs font-semibold text-gray-400 dark:text-zinc-400">{title}</h2>}
            <div className="space-y-1">
                {items.map((item, i) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={`${item.title}-${i}`}
                            to={item.href}
                            activeProps={{
                                className: cn(
                                    "flex items-center justify-start gap-3 rounded-md px-4 py-2 text-sm transition-colors",
                                    "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-zinc-50",
                                    !open && "justify-center px-0 py-3",
                                ),
                            }}
                            inactiveProps={{
                                className: cn(
                                    "flex items-center justify-start gap-3 rounded-md px-4 py-2 text-sm transition-colors",
                                    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                                    item.variant === "ghost"
                                        ? "bg-transparent"
                                        : item.variant === "default"
                                          ? "bg-gray-100/80 text-gray-600 dark:bg-zinc-800/50 dark:text-zinc-400"
                                          : "",
                                    !open && "justify-center px-0 py-3",
                                ),
                            }}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={cn(
                                            "h-5 w-5 shrink-0",
                                            isActive ? "text-gray-900 dark:text-zinc-50" : "text-gray-400 dark:text-zinc-400",
                                        )}
                                        aria-hidden="true"
                                    />
                                    {open && <span>{item.title}</span>}
                                </>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
