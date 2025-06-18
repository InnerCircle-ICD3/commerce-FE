import ChatManagement from "@/features/chat/pages/ChatManagement";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
    component: ChatManagement,
});
