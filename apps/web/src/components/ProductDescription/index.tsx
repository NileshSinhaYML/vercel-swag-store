import { APP_CONSTANTS } from "@/constants/app.constants";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";

export interface ProductDescriptionProps {
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  hasLowStock: boolean;
  isOutOfStock: boolean;
}

export const ProductDescription: FC<ProductDescriptionProps> = async ({
  name,
  description,
  price,
  currency,
  stock,
  hasLowStock,
  isOutOfStock,
}) => {
  const formatter = await getFormatter();
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: APP_CONSTANTS.NAME_SPACES.PDP,
  });
  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-4">
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
