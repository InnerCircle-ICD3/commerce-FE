import { createFileRoute } from '@tanstack/react-router';
import ChatManagementPage from '@/features/chat/pages/ChatManagement';
import { Route as authenticatedRoute } from './route';

export const Route = createFileRoute('/_authenticated/chat-management')({
  getParentRoute: () => authenticatedRoute,
  component: ChatManagementPage,
});
