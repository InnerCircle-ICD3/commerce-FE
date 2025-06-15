import { createFileRoute } from '@tanstack/react-router';
import ChatManagementPage from '@/features/chat/pages/ChatManagement';

export const Route = createFileRoute('/_authenticated/chat-management')({
  component: ChatManagementPage,
});
