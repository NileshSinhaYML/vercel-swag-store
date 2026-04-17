import {
  fetchProductDetails,
  fetchProductStock,
} from "@/app/[locale]/product/[slug]/actions";
import { ProductAddToCart } from "@/components/ProductAddToCart";
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
    <div className="col-span-full grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:gap-y-12">
      <div className="lg:col-span-7">
        {hasImage ? (
          <div className="bg-muted/30 ring-border/80 relative mx-auto aspect-square max-h-[min(36rem,calc(100dvh-var(--nav-height)-var(--footer-height)-8rem)))] w-full max-w-xl overflow-hidden rounded-2xl ring-1 lg:mx-0 lg:max-h-none lg:w-[min(100%,calc(100dvh-var(--nav-height)-var(--footer-height)-8rem)))] lg:max-w-none lg:justify-self-start">
            <Image
              src={details.images[0] as string}
              alt={details.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-10 lg:col-span-5 lg:max-w-lg lg:justify-center lg:pl-2">
        <ProductDescription
          category={details.category}
          name={details.name}
          description={details.description}
          price={details.price}
          currency={details.currency}
          stock={stock}
          hasLowStock={hasLowStock}
          isOutOfStock={isOutOfStock}
        />
        <ProductAddToCart
          productId={details.id}
          stock={stock}
          isOutOfStock={isOutOfStock}
        />
      </div>
    </div>
  );
};
