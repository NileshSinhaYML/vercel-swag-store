import type { FC } from "react";
import type { Product } from "@/types/api/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@repo/ui/lib/utils";

export interface ProductCardGridProps {
  products?: Product[];
  className?: string;
}

export const ProductCardGrid: FC<ProductCardGridProps> = ({
  products,
  className,
}) => (
  <div className={cn("grid grid-cols-12 gap-4 lg:gap-10", className)}>
    {products &&
      products?.length > 0 &&
      products.map((product, index) => (
        <div
          className="col-span-full md:col-span-6 lg:col-span-4"
          key={product.id}
        >
          <ProductCard {...product} shouldLoadEager={index < 3} />
        </div>
      ))}
  </div>
);
