import type { FC } from "react";
import type { Product } from "@/types/api/products";
import { ProductCard } from "@/components/ProductCard";

export interface ProductCardGridProps {
  products?: Product[];
}

export const ProductCardGrid: FC<ProductCardGridProps> = ({ products }) => (
  <div className="grid grid-cols-12 gap-4 lg:gap-10">
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
