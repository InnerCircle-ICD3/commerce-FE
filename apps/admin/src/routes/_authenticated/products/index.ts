import { createFileRoute } from '@tanstack/react-router'
import ProductsPage from '@/features/product'

export const Route = createFileRoute('/_authenticated/products/')({
  component: ProductsPage,
})
