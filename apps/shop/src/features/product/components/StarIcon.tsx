export default function StarIcon({ fillPercent, uniqueId }: { fillPercent: number; uniqueId: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffc000" />
                    <stop offset={`${fillPercent}%`} stopColor="#ffc000" />
                    <stop offset={`${fillPercent}%`} stopColor="#e0e0e0" />
                    <stop offset="100%" stopColor="#e0e0e0" />
                </linearGradient>
            </defs>
            <path
                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                fill={`url(#${uniqueId})`}
            />
        </svg>
    );
}
