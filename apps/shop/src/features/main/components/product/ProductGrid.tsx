import { BannerCard } from "./BannerCard";
import { ProductCard, type ProductCardProps } from "./ProductCard";

type BannerItem = {
  type: "banner";
  id?: string;
  image: string;
  title: string;
  description: string;
};

type ProductItem = ProductCardProps;
type ProductGridItem = BannerItem | ProductItem;

interface ProductGridProps {
  products: ProductGridItem[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {products.map((product, index) => {
        const getUniqueKey = (product: ProductGridItem, index: number) => {
          if ("id" in product && product.id) {
            return product.id;
          }

          if ("type" in product && product.type === "banner") {
            return `banner-${index}-${product.title
              .substring(0, 10)
              .replace(/\s+/g, "-")}`;
          }

          if ("name" in product && product.name) {
            return `product-${index}-${product.name
              .substring(0, 10)
              .replace(/\s+/g, "-")}`;
          }

          return `item-${index}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        };

        const uniqueKey = getUniqueKey(product, index);

        if ("type" in product && product.type === "banner") {
          return (
            <BannerCard
              key={uniqueKey}
              image={product.image}
              title={product.title}
              description={product.description}
            />
          );
        }
        return <ProductCard key={uniqueKey} {...(product as ProductItem)} />;
      })}
    </div>
  );
};
