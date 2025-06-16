export function ProductVideo({ detailImage }: { detailImage: string }) {
    return (
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto">
                <div className="relative w-full h-[28rem] rounded-xl overflow-hidden">
                    <img src={detailImage} alt="detailImage" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}
