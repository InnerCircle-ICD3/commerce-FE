import ChatManagementPage from "@/features/chat/pages/ChatManagement";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/chat-management")({
    component: ChatManagementPage,
});
