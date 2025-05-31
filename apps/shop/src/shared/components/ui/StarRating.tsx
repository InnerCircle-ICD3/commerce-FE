interface StarRatingProps {
    rating: number;
    maxStars?: number;
    size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, maxStars = 5, size = "md" }: StarRatingProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    };

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxStars }, (_, index) => index + 1).map(star => (
                <svg
                    key={star}
                    className={`${sizeClasses[size]} ${star <= rating ? "text-[#ffc000]" : "text-[#37383c]/10"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}
