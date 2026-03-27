import { APP_CONSTANTS } from "@/constants/app.constants";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface ProductDescriptionProps {
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
    <div className={cn("flex flex-col gap-y-2 lg:gap-y-4", className)}>
      <h1 className="text-xl font-bold lg:text-4xl">{name}</h1>
      <p className="text-sm text-gray-500/60 lg:text-base">{description}</p>
      <span className="text-lg font-semibold lg:text-2xl">
        {formatter.number(price, {
          style: "currency",
          currency,
        })}
      </span>
      {hasLowStock && (
        <p className="text-xs font-bold text-red-500/70">
          {t("LOW_STOCK", { stock })}
        </p>
      )}
      {isOutOfStock && (
        <p className="text-xs font-bold text-red-500/70">{t("OUT_OF_STOCK")}</p>
      )}
    </div>
  );
};
