function HeroBanner() {
    return (
        <section className="relative w-full">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6efa1b8d524b91891b772502f42519490e0b876"
                alt="Background"
                className="object-cover absolute inset-0 w-full h-full"
                aria-hidden="true"
            />
            <div className="relative flex flex-col justify-center w-full min-h-64">
                <div className="mx-auto w-full max-w-screen-xl px-6 py-20">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-6xl font-bold tracking-tight leading-[4.5rem] text-white max-md:text-4xl">
                            801 버츄오 커피
                        </h1>
                        <p className="mt-6 text-lg font-semibold leading-6 text-white">
                            혁신적인 바코드 브루잉으로 열리는 차원이 다른 커피
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;
