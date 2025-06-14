"use client";

import { useEffect, useRef, useState } from "react";

export default function CoffeeLetter() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <article
            ref={ref}
            className={`flex flex-col md:flex-row items-center gap-10 py-16 px-6 transition-all duration-300 ${
                isVisible ? "animate-fade-in animate-slide-up opacity-100" : "opacity-0 translate-y-8"
            }`}
        >
            <section className="overflow-hidden grow shrink self-stretch my-auto leading-snug text-black whitespace-nowrap rounded-xl min-w-60 w-[35rem] max-md:max-w-full">
                <div className="flex relative flex-col items-start px-14 py-24 w-full min-h-[23rem] max-md:px-5 max-md:pt-24 max-md:max-w-full">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39753b2bf47d65b84b124b51611257249f06b6fb"
                        alt="Background pattern"
                        className="object-cover absolute inset-0 size-full"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7390e55305441f67617e97da935194d032e660d"
                        alt="Decorative element 1"
                        className="object-contain mt-1.5 ml-24 w-6 aspect-square max-md:ml-2.5"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7390e55305441f67617e97da935194d032e660d"
                        alt="Decorative element 2"
                        className="object-contain self-center mt-5 ml-12 w-6 aspect-square"
                    />
                </div>
            </section>
            <section className="flex flex-col justify-center self-stretch my-auto min-w-60">
                <div className="flex flex-col justify-center">
                    <h2 className="text-base font-semibold tracking-tight leading-snug text-neutral-700">커피레터</h2>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight leading-9 text-black">
                        잠시 걸음을 멈추고
                        <br />
                        여유를 찾아 떠나 보시는 건 어떨까요?
                    </h3>
                </div>
                <button
                    type="button"
                    className="gap-2.5 self-start mt-6 text-base font-semibold tracking-tight text-black whitespace-nowrap border-b-2 border-solid border-b-[color:var(--Normal-Strong,#000)] min-h-12 w-14"
                >
                    보러가기
                </button>
            </section>
        </article>
    );
}
