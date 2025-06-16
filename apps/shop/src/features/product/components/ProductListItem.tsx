import type { ProductType } from "../types";
import Image from "next/image";

interface ProductListItemProps {
    product: ProductType;
}
export const ProductListItem = ({ product }: ProductListItemProps) => {
    return (
        <div className="flex">
            <div>
                <Image src={product.detailImage} alt={product.name} width={100} height={100} />
            </div>
            <div>
                <p>{product.name}</p>
                <p>₩ {product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};
