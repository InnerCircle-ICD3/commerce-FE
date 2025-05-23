import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full bg-black py-16">
            <div className="flex flex-col justify-center items-start mx-auto max-w-7xl px-6">
                <div className="flex flex-wrap justify-between w-full gap-6 pt-10 pb-6 border-b border-gray-700">
                    <section className="w-96 min-w-60">
                        <Link href="/main" className="cursor-pointer">
                            <h1 className="text-2xl font-bold tracking-tight leading-snug text-white w-auto">801 COFFEE</h1>
                        </Link>
                        <p className="mt-6 text-sm font-medium leading-6 text-stone-300">
                            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
                        </p>
                    </section>
                </div>
                <nav className="flex gap-9 justify-between items-start mt-6 max-w-full w-44">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e078337bf1f31e629d97c47d1d3170861c10de5"
                        alt="Social Media Icon"
                        className="object-contain shrink-0 w-4 aspect-square"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b4e7697a32324c8c6f90476755b5923bf64465a"
                        alt="Social Media Icon"
                        className="object-contain shrink-0 w-4 aspect-square"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2003206ccaacf8618b22aa73146d74de847f0f0f"
                        alt="Social Media Icon"
                        className="object-contain shrink-0 w-4 aspect-square"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5001bf5c5a35a6e7b9b4af991c16445650d8b6d"
                        alt="Social Media Icon"
                        className="object-contain shrink-0 w-4 aspect-square"
                    />
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
