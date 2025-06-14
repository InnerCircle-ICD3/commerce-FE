import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full bg-black py-16">
            <div className="flex flex-col justify-center items-start mx-auto max-w-7xl px-6">
                <div className="flex flex-wrap justify-between w-full gap-6 pt-10 pb-6 border-b border-gray-700">
                    <section className="w-96 min-w-60">
                        <Link href="/main" className="cursor-pointer">
                            <h1 className="text-2xl font-bold tracking-tight leading-snug text-white w-auto">801 COFFEE</h1>
                        </Link>{" "}
                        <p className="mt-6 text-sm font-medium leading-6 text-stone-300">
                            We are a premium capsule coffee specialist bringing you the perfect cup every time. Experience exceptional quality and
                            convenience.
                        </p>
                    </section>
                </div>
                <nav className="flex gap-9 justify-between items-start mt-6 max-w-full w-44" />
            </div>
        </footer>
    );
}

export default Footer;
