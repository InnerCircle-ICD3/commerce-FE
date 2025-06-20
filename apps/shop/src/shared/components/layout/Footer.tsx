import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full bg-black py-16">
            <div className="flex flex-col justify-center items-start mx-auto max-w-7xl px-6">
                <div className="flex flex-wrap justify-between w-full gap-6 pt-10 pb-6 border-b border-gray-700">
                    <section className="w-full min-w-60">
                        <Link href="/main" className="cursor-pointer">
                            <h1 className="text-2xl font-bold tracking-tight leading-snug text-white w-auto">801 COFFEE</h1>
                        </Link>
                        <p className="mt-6 text-sm font-medium leading-6 text-stone-300">We are a premium capsule coffee specialist,</p>
                        <p className="text-sm font-medium leading-6 text-stone-300">bringing you the perfect cup every time.</p>
                        <p className="text-sm font-medium leading-6 text-stone-300">Experience exceptional quality and convenience.</p>
                    </section>
                </div>
                <div className="w-full pt-6">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                        <Link href="/terms" className="text-xs text-stone-400 hover:text-stone-300 transition-colors duration-200">
                            이용약관
                        </Link>
                        <span className="hidden sm:inline text-xs text-stone-600">|</span>
                        <Link href="/privacy" className="text-xs text-stone-400 hover:text-stone-300 transition-colors duration-200">
                            개인정보 처리방침
                        </Link>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-stone-500">© 2025 801 Base. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
