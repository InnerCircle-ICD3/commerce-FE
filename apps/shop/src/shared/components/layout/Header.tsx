"use client";
import SearchProduct from "@/src/features/product/components/SearchProduct";
import * as React from "react";

function Header() {
    return (
        <div className="w-full bg-white border-b border-solid border-b-[color:var(--Line-Sub2,rgba(112,115,124,0.08))]">
            <header className="flex flex-wrap gap-8 items-center px-6 py-4 mx-auto max-w-[1240px]">
                <div className="self-stretch my-auto text-2xl font-bold tracking-tight leading-snug text-center text-black w-[135px]">
                    <h1 className="self-stretch text-black">801 COFFEE</h1>
                </div>

                <SearchProduct />

                <nav className="flex gap-6 justify-center items-center self-stretch my-auto">
                    <button type="button" className="focus:outline-none">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d83c3984fea3767c661c7b9a7ae20f706764920a"
                            alt="Navigation Icon 1"
                            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                        />
                    </button>
                    <button type="button" className="focus:outline-none">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb40dd9fddf419c3fe59ba9750479588879625e9"
                            alt="Navigation Icon 2"
                            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                        />
                    </button>
                </nav>
            </header>
        </div>
    );
}

export default Header;
