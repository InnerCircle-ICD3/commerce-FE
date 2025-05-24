"use client";

import { useState } from "react";
import ChatDialog from "./ChatDialog";

const ChatButton = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <button onClick={toggleChat} aria-label="채팅 상담" className="cursor-pointer" type="button">
                <div className="w-8 h-8 flex items-center justify-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="chatIconTitle"
                    >
                        <title id="chatIconTitle">채팅 상담</title>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 13.92 2.55 15.75 3.43 17.24C3.58 17.5 3.56 17.82 3.38 18.06L2.4 19.31C2.2 19.57 2.33 19.95 2.65 20.04C4.85 20.65 7.21 20.03 9 18.56C9.95 18.86 10.97 19 12 19C17.52 19 22 14.52 22 9C22 3.48 17.52 2 12 2ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5ZM16 11.5C15.17 11.5 14.5 10.83 14.5 10C14.5 9.17 15.17 8.5 16 8.5C16.83 8.5 17.5 9.17 17.5 10C17.5 10.83 16.83 11.5 16 11.5Z"
                            fill="black"
                        />
                    </svg>
                </div>
            </button>

            {isChatOpen && <ChatDialog onClose={() => setIsChatOpen(false)} />}
        </>
    );
};

export default ChatButton;
