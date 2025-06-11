import { createFileRoute } from '@tanstack/react-router';
import ProductForm from '../../../features/product/ProductForm';

export const Route = createFileRoute('/_authenticated/products/new')({
  component: ProductForm
});
