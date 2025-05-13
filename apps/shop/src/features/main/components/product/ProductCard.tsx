import { Fragment } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { Badge } from "./Badge";
import { ProductFeature } from "./ProductFeature";

interface ProductBadge {
  text: string;
  variant: "default" | "yellow" | "purple" | "red" | "green";
}

interface ProductFeatureType {
  icon?: string;
  value: string;
  label?: string;
  strength?: number;
}

export interface ProductCardProps {
  badges: ProductBadge[];
  image: string;
  features: ProductFeatureType[];
  name: string;
  description: string;
  price: number;
  unit: string;
  outOfStock?: boolean;
}

export const ProductCard = ({
  badges,
  image,
  features,
  name,
  description,
  price,
  unit,
  outOfStock = false,
}: ProductCardProps) => {
  return (
    <article className="w-full h-full pt-4 pb-6 px-4 bg-white rounded-xl border border-[rgba(112,115,124,0.08)] flex flex-col justify-start items-start gap-4">
      <div className="self-stretch flex-1 flex flex-col justify-between items-center gap-3">
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          {/* 이미지 영역 */}
          <div className="self-stretch flex items-center justify-center overflow-hidden aspect-[136/117]">
            <img
              src={image}
              alt={name}
              className="w-full h-full  object-cover"
            />
          </div>

          {/* 특징 영역 */}
          <div className="self-stretch flex justify-center items-center gap-4">
            {features.map((feature, index) => {
              const featureKey = `feature-${index}-${feature.value.replace(
                /\s+/g,
                "-"
              )}`;
              return (
                <Fragment key={featureKey}>
                  {index > 0 && (
                    <div className="w-0 h-5 origin-top-left border-l border-gray-200" />
                  )}
                  <ProductFeature {...feature} />
                </Fragment>
              );
            })}
          </div>

          {/* 제품 정보 영역 */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <h3 className="self-stretch text-center text-black text-base font-bold leading-[22.4px]">
                {name}
              </h3>
              <p className="self-stretch h-10 text-center text-[#171719] text-sm font-normal leading-[19.6px] overflow-hidden">
                {description}
              </p>
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-[2px]">
              <div className="self-stretch flex justify-center items-start gap-1">
                <span className="text-center text-[#257A57] text-2xl font-bold leading-[33.6px]">
                  ₩
                </span>
                <span className="text-center text-[#257A57] text-2xl font-bold leading-[33.6px]">
                  {price.toLocaleString()}
                </span>
              </div>
              <p className="text-center text-neutral-700 text-sm">{unit}</p>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="self-stretch h-12 px-1 py-0.75">
          <AddToCartButton disabled={outOfStock} />
        </div>
      </div>
    </article>
  );
};
