import { Link } from "@/i18n/navigation";
import { Button } from "@ui/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";
import { getFeaturedProducts } from "@/components/FeaturedProducts/featuredProducts.actions";
import { ProductCardGrid } from "@/components/ProductCardGrid";
import { PAGE_ROUTES } from "@/constants/page.routes";

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
          <Link href={PAGE_ROUTES.PRODUCTS}>{t("VIEW_ALL")}</Link>
        </Button>
      </div>
      <ProductCardGrid products={featuredProducts?.data} />
    </div>
  );
};
