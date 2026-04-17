import { APP_CONSTANTS } from "@/constants/app.constants";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface ProductDescriptionProps {
  category: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  hasLowStock: boolean;
  isOutOfStock: boolean;
  className?: string;
}

export const ProductDescription: FC<ProductDescriptionProps> = async ({
  category,
  name,
  description,
  price,
  currency,
  stock,
  hasLowStock,
  isOutOfStock,
  className,
}) => {
  const formatter = await getFormatter();
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: APP_CONSTANTS.NAME_SPACES.PDP,
  });
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-4">
        {category ? (
          <span className="text-muted-foreground w-fit rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-[11px] font-medium capitalize tracking-widest">
            {category}
          </span>
        ) : null}
        <h1 className="text-foreground text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.08]">
          {name}
        </h1>
        <p className="text-muted-foreground max-w-prose text-base leading-relaxed lg:text-lg">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-3 border-t border-border/80 pt-6">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {t("PRICE_LABEL")}
        </span>
        <p className="text-3xl font-semibold tabular-nums tracking-tight lg:text-4xl">
          {formatter.number(price, {
            style: "currency",
            currency,
          })}
        </p>
        {hasLowStock ? (
          <p
            className="border-destructive/25 bg-destructive/5 text-destructive w-fit rounded-lg border px-3 py-2 text-sm font-medium"
            role="status"
          >
            {t("LOW_STOCK", { stock })}
          </p>
        ) : null}
        {isOutOfStock ? (
          <p
            className="border-destructive/25 bg-destructive/5 text-destructive w-fit rounded-lg border px-3 py-2 text-sm font-medium"
            role="alert"
          >
            {t("OUT_OF_STOCK")}
          </p>
        ) : null}
      </div>
    </div>
  );
};
