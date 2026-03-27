"use client";

import type { Product } from "@/types/api/products";
import type { FC } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import Image from "next/image";
import { useFormatter } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

export interface ProductCardProps extends Product {
  shouldLoadEager?: boolean;
  className?: string;
}
export const ProductCard: FC<ProductCardProps> = ({
  name,
  images,
  description,
  price,
  currency,
  slug,
  shouldLoadEager = false,
  className,
}) => {
  const formatter = useFormatter();
  return (
    <Card className={cn("group relative h-full", className)}>
      <Button
        asChild
        variant="link"
        className="absolute inset-0 z-1 size-full cursor-pointer"
      >
        <Link href={`/product/${slug}`} />
      </Button>
      <div className="relative mx-auto flex w-full items-center justify-center">
        {images.length > 0 && (
          <Image
            src={images[0] as string}
            alt={name}
            width={400}
            height={400}
            className="aspect-square"
            loading={shouldLoadEager ? "eager" : "lazy"}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle className="group-focus-within:underline group-hover:underline">
          {name}
        </CardTitle>
        <CardDescription className="flex flex-col gap-y-2">
          <p>{description}</p>
          <span className="font-semibold">
            {formatter.number(price, { style: "currency", currency })}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
