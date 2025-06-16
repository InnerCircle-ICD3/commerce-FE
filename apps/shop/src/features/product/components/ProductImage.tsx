interface ProductImageProps {
    thumbnail: string;
    title: string;
}

export function ProductImage({ thumbnail, title }: ProductImageProps) {
    // 메인 이미지가 없는 경우 기본 이미지 사용
    const mainImage = thumbnail ? thumbnail : "https://cdn.builder.io/api/v1/image/assets/TEMP/e6efa1b8d524b91891b772502f42519490e0b876";

    return (
        <div className="w-full max-w-xl">
            <div className="relative w-full h-[32rem] bg-white rounded-lg overflow-hidden">
                <img src={mainImage} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* {images.length > 1 && (
                <div className="flex gap-2 mt-4">
                    {images.map((image, index) => (
                        <button
                            key={`image-${image.substring(0, 8)}-${index}`}
                            type="button"
                            onClick={() => setCurrentImage(index)}
                            className={`w-5 h-5 border rounded-md overflow-hidden ${
                                index === currentImage ? "border-blue-500" : "border-gray-200"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${title} - 이미지 ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )} */}
        </div>
    );
}
