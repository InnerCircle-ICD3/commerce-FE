import { createRoute } from '@tanstack/react-router'
import { Route as authenticatedRoute } from './route'
import ProductsPage from '@/pages/products/Products'

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/products',
  component: ProductsPage,
})
