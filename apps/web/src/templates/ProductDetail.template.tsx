import {
  fetchProductDetails,
  fetchProductStock,
} from "@/app/[locale]/product/[slug]/actions";
import { ProductDescription } from "@/components/ProductDescription";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { FC } from "react";

export interface ProductDetailTemplateProps {
  pid: string;
}

export const ProductDetailTemplate: FC<ProductDetailTemplateProps> = async ({
  pid,
}) => {
  const productDetailsResponse = await fetchProductDetails(pid);
  if (!productDetailsResponse) notFound();
  const productStockResponse = await fetchProductStock(pid);
  const details = productDetailsResponse.data;
  const hasImage = details && details.images?.length > 0;
  const stock = productStockResponse?.data.stock || 0;
  const hasLowStock = productStockResponse?.data?.lowStock || false;
  const isOutOfStock = !productStockResponse?.data?.inStock;

  return (
    <div className="col-span-full grid grid-cols-12 gap-4 lg:gap-10">
      <div className="col-span-full lg:col-span-6">
        {hasImage && (
          <Image
            src={details.images[0] as string}
            alt={details.name}
            width={600}
            height={600}
            loading="eager"
            className="mx-auto aspect-square object-cover"
          />
        )}
      </div>
      <div className="col-span-full lg:col-span-6">
        <ProductDescription
          name={details.name}
          description={details.description}
          price={details.price}
          currency={details.currency}
          stock={stock}
          hasLowStock={hasLowStock}
          isOutOfStock={isOutOfStock}
        />
      </div>
    </div>
  );
};
