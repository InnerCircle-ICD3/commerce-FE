interface CategoryItemProps {
    title: string;
    description: string;
    imageUrl: string;
}

export function CategoryItem({ title, description, imageUrl }: CategoryItemProps) {
    return (
        <div className="flex flex-col h-full max-w-full">
            <div className="w-full h-36 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <img src={imageUrl} alt={title} className="w-24 h-24 object-contain break-keep" />
            </div>
            <div className="flex flex-col items-center justify-center text-center bg-black text-white w-full p-4 rounded-b-lg break-keep flex-1 min-h-[120px]">
                <h3 className="text-base font-bold mb-1">{title}</h3>
                <p className="text-sm text-white/80">{description}</p>
            </div>
        </div>
    );
}
