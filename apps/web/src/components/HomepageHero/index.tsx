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
      <p className="text-sm text-gray-400">{t("HERO_SUBTITLE")}</p>
      <Button asChild className="w-fit px-3 py-4 text-sm" variant="default">
        <Link href="/products">
          <span>{t("HERO_CTA")}</span>
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
};
