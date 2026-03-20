import { Link } from "@/i18n/navigation";
import { Button } from "@ui/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";
import { getFeaturedProducts } from "./featuredProducts.actions";
import { ProductCard } from "../ProductCard";

export const FeaturedProducts: FC = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "HOME_PAGE" });
  const featuredProducts = await getFeaturedProducts();
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-6 text-lg font-semibold">
          {t("FEATURED_PRODUCTS_TITLE")}
        </h3>
        <Button
          asChild
          variant="link"
          className="text-xs text-gray-500 hover:text-gray-700 hover:no-underline"
        >
          <Link href="/products">{t("VIEW_ALL")}</Link>
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 lg:gap-10">
        {featuredProducts &&
          featuredProducts?.data?.length > 0 &&
          featuredProducts.data.map((product, index) => (
            <div
              className="col-span-full md:col-span-6 lg:col-span-4"
              key={product.id}
            >
              <ProductCard {...product} shouldLoadEager={index < 3} />
            </div>
          ))}
      </div>
    </div>
  );
};
