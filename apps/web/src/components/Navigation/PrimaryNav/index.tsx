import { Suspense } from "react";
import type { FC } from "react";
import { LogoVercel } from "geist-icons";
import { PRIMARY_NAV_CONSTANTS } from "./PrimaryNav.constants";
import { Button } from "@ui/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ShoppingBag } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export const PrimaryNav: FC = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "NAVIGATION",
  });
  return (
    <div className="flex items-center gap-x-4 px-6 py-4 lg:gap-x-8 lg:px-10">
      <div className="flex h-full items-start gap-x-2">
        <Button asChild variant="link" className="pl-0 hover:no-underline">
          <Link href="/">
            <LogoVercel aria-hidden="true" />
            <span className="text-sm font-medium">{t("TITLE")}</span>
          </Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center gap-x-2 lg:gap-x-4">
          {PRIMARY_NAV_CONSTANTS.MENU_LINKS.map((link) => (
            <Button
              key={link.name}
              asChild
              variant="link"
              className="text-xs text-gray-400 hover:text-gray-700 hover:no-underline"
            >
              <Link href={link.href}>{t(link.name.toUpperCase())}</Link>
            </Button>
          ))}
        </div>
      </Suspense>
      <div className="ml-auto">
        <ShoppingBag aria-label={t("CART")} />
      </div>
    </div>
  );
};
