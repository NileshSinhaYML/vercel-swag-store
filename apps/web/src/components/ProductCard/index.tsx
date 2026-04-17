"use client";

import { APP_CONSTANTS } from "@/constants/app.constants";
import { PAGE_ROUTES } from "@/constants/page.routes";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/api/products";
import { cn } from "@repo/ui/lib/utils";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import type { FC } from "react";

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
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.PDP);
  const href = `${PAGE_ROUTES.PRODUCT_DETAIL}/${slug}`;
  const hasImage = images.length > 0;

  return (
    <Link
      href={href}
      className={cn(
        "group border-border/80 bg-card/40 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm",
        "transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:ring-ring focus-visible:ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="bg-muted/30 ring-border/80 relative aspect-square w-full shrink-0 overflow-hidden ring-1 ring-inset">
        {hasImage ? (
          <Image
            src={images[0] as string}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            loading={shouldLoadEager ? "eager" : "lazy"}
          />
        ) : (
          <div
            className="bg-muted/50 flex size-full items-center justify-center"
            aria-hidden
          >
            <ImageOff
              className="text-muted-foreground size-10 opacity-35"
              strokeWidth={1.25}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground decoration-foreground/25 line-clamp-2 text-base leading-snug font-semibold tracking-tight underline-offset-4 group-hover:underline">
            {name}
          </h3>
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="border-border/60 mt-auto flex flex-col gap-1 border-t pt-4">
          <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
            {t("PRICE_LABEL")}
          </span>
          <p className="text-foreground text-xl font-semibold tracking-tight tabular-nums">
            {formatter.number(price, { style: "currency", currency })}
          </p>
        </div>
      </div>
    </Link>
  );
};
