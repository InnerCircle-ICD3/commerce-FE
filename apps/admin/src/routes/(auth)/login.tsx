import { createRoute } from '@tanstack/react-router'
import { Route as authRoute } from './route'
import LoginComponent from '@/features/login/LoginComponent'

export const Route = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: LoginComponent,
})
