export const FilterBar = () => {
    return (
        <div className="flex flex-wrap gap-6 items-center w-full text-base tracking-tight leading-snug whitespace-nowrap max-md:max-w-full">
            <button
                type="button"
                className="flex gap-1 items-center self-stretch px-4 py-2 my-auto bg-white rounded-md border border-solid border-[color:var(--Line-Default,rgba(112,115,124,0.22))] min-h-10 text-zinc-800"
            >
                <span className="self-stretch my-auto">필터</span>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b490d445cfdfc842b41aead93676e2b5461b92d1"
                    alt="Filter icon"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
            </button>

            <nav className="flex gap-2.5 items-center self-stretch my-auto min-w-60 text-neutral-700">
                <button type="button" className="flex gap-1 items-center self-stretch my-auto font-bold text-green-700">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8621762b7af151dad6726f0db8e3c3a7b94a7aa"
                        alt="Recommended"
                        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    />
                    <span>추천순</span>
                </button>
                <div className="shrink-0 self-stretch my-auto w-0 h-3 border border-solid bg-zinc-500 bg-opacity-20 border-zinc-500 border-opacity-20" />
                <button type="button" className="self-stretch my-auto">
                    낮은가격순
                </button>
                <div className="shrink-0 self-stretch my-auto w-0 h-3 border border-solid bg-zinc-500 bg-opacity-20 border-zinc-500 border-opacity-20" />
                <button type="button" className="self-stretch my-auto">
                    높은가격순
                </button>
                <div className="shrink-0 self-stretch my-auto w-0 h-3 border border-solid bg-zinc-500 bg-opacity-20 border-zinc-500 border-opacity-20" />
                <button type="button" className="self-stretch my-auto">
                    낮은강도순
                </button>
                <div className="shrink-0 self-stretch my-auto w-0 h-3 border border-solid bg-zinc-500 bg-opacity-20 border-zinc-500 border-opacity-20" />
                <button type="button" className="self-stretch my-auto">
                    높은강도순
                </button>
            </nav>
        </div>
    );
};
