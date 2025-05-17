const DeleteIcon = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="none"
        onClick={onClick}
    >
        <title>Close icon</title>
        <path
            d="M8.53269 24.8715L7.12769 23.4665L14.5944 15.9998L7.12769 8.53317L8.53269 7.12817L15.9994 14.5948L23.466 7.12817L24.871 8.53317L17.4044 15.9998L24.871 23.4665L23.466 24.8715L15.9994 17.4048L8.53269 24.8715Z"
            fill="black"
        />
    </svg>
);
