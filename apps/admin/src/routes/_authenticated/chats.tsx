import { createRoute } from "@tanstack/react-router";
import { Route as authenticatedRoute } from "./route";
import ChatPage from "@/pages/chat/Chats";

export const Route = createRoute({
    getParentRoute: () => authenticatedRoute,
    path: "/chats",
    component: ChatPage,
});
