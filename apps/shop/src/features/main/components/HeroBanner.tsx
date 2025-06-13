"use client";

import { useScramble } from "use-scramble";

function HeroBanner() {
    const { ref } = useScramble({
        text: "바코드 브루잉",
        range: [44032, 55203],
        speed: 1,
        tick: 1,
        step: 10,
        scramble: 25,
        seed: 3,
        chance: 1,
        overdrive: false,
        overflow: false,
    });

    return (
        <section className="relative w-full">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6efa1b8d524b91891b772502f42519490e0b876"
                alt="Background"
                className="object-cover absolute inset-0 w-full h-full"
                aria-hidden="true"
            />
            <div className="relative flex flex-col justify-center w-full min-h-64">
                <div className="w-full px-6 py-20">
                    <div className="mx-auto text-center">
                        <h1 className="text-6xl font-bold tracking-tight leading-[4.5rem] text-white max-md:text-4xl">801 버츄오 커피</h1>
                        <p className="mt-6 text-lg font-semibold leading-6 text-white">
                            혁신적인 <span ref={ref} />으로 열리는 차원이 다른 커피
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;
