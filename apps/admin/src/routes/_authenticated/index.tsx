import { createRoute } from '@tanstack/react-router'
import { Route as authenticatedRoute } from './route'
import DashboardPage from '@/pages/dashboard/Dashboard'

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/',
  component: DashboardPage,
})
