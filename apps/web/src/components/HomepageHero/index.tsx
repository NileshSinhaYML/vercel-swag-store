import { PAGE_ROUTES } from "@/constants/page.routes";
import { Link } from "@/i18n/navigation";
import { Button } from "@ui/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";

export const HomepageHero: FC = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "HOME_PAGE",
  });
  return (
    <div className="flex w-full flex-col gap-y-4 lg:w-1/3 lg:gap-y-6">
      <h1 className="text-5xl font-bold">{t("HERO_TITLE")}</h1>
      <h2 className="text-sm text-gray-400">{t("HERO_SUBTITLE")}</h2>
      <Button asChild className="w-fit px-3 py-4 text-sm" variant="default">
        <Link href={PAGE_ROUTES.PRODUCTS}>
          <span>{t("HERO_CTA")}</span>
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
};
