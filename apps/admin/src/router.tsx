import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootLayout from './layouts/RootLayout.tsx';
import DashboardPage from './pages/Dashboard.tsx';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
