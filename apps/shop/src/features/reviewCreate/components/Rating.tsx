"use client";
import { useCallback, useEffect, useState } from "react";

interface RatingProps {
    rating: number;
    onChange: (rating: number) => void;
    disabled?: boolean;
}

export default function Rating({ rating, onChange, disabled = false }: RatingProps) {
    const [selectedRating, setSelectedRating] = useState(rating);

    const handleRatingClick = useCallback(
        (index: number) => {
            if (disabled) return;
            setSelectedRating(index + 1);
        },
        [disabled],
    );

    useEffect(() => {
        onChange(selectedRating);
    }, [selectedRating, onChange]);

    // 단순히 별점을 정해진 갯수만큼 반환. 정렬을 맥락에 따라 사용시점에 조정해야 함.
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={`star-${index + 1}`}>
                    <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleRatingClick(index)}
                    >
                        <title>별점 선택</title>
                        <path
                            d="M9.59358 0.945159C9.95247 0.174999 11.0475 0.174998 11.4064 0.945159L13.6725 5.80819C13.8183 6.12091 14.1149 6.33643 14.4573 6.37839L19.7826 7.03083C20.626 7.13415 20.9644 8.17563 20.3428 8.75494L16.4181 12.4129C16.1657 12.6481 16.0524 12.9968 16.1183 13.3355L17.1434 18.6018C17.3057 19.4358 16.4198 20.0794 15.6768 19.6673L10.985 17.065C10.6833 16.8977 10.3167 16.8977 10.015 17.065L5.32322 19.6673C4.58019 20.0794 3.69426 19.4358 3.8566 18.6018L4.8817 13.3355C4.94762 12.9968 4.83432 12.6481 4.58193 12.4129L0.657179 8.75494C0.0356146 8.17563 0.374009 7.13415 1.21738 7.03083L6.54266 6.37839C6.88511 6.33643 7.18175 6.12091 7.32747 5.80819L9.59358 0.945159Z"
                            fill={index + 1 > selectedRating ? "#37383C" : "#FFC000"}
                            fill-opacity={index + 1 > selectedRating ? "0.16" : "1"}
                        />
                    </svg>
                </div>
            ))}
        </>
    );
}
