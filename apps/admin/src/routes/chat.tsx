import { createFileRoute } from '@tanstack/react-router';
import ChatManagement from '@/features/chat/pages/ChatManagement';

export const Route = createFileRoute('/chat')({
  component: ChatManagement,
});
