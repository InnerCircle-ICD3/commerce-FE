export default function CartPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="p-7 flex flex-col gap-8 items-center w-full">
            <div className="w-full flex flex-col gap-8">{children}</div>
        </section>
    );
}
