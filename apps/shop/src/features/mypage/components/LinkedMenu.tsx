import Link from "next/link";
import React from "react";
import { MoreIcon } from "@/src/features/mypage/icons/MoreIcon";

export default function FoldedMenu({ name, href }: { name: string; href: string }) {
    return (
        <Link href={href}>
            <div className="flex justify-between items-center relative pt-6 pb-4 border-b border-[#F4F4F5]">
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <MoreIcon />
                </div>
            </div>
        </Link>
    );
}
