import type { FC } from "react";
import { LogoVercel } from "geist-icons";
import { CartNavLink } from "@/components/CartNavLink";
import { PRIMARY_NAV_CONSTANTS } from "@/components/Navigation/PrimaryNav/PrimaryNav.constants";
import { Button } from "@ui/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { PAGE_ROUTES } from "@/constants/page.routes";

export const PrimaryNav: FC = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: APP_CONSTANTS.NAME_SPACES.NAVIGATION,
  });
  return (
    <div className="flex items-center gap-x-4 px-6 py-4 lg:gap-x-8 lg:px-10">
      <div className="flex h-full items-start gap-x-2">
        <Button asChild variant="link" className="pl-0 hover:no-underline">
          <Link href={PAGE_ROUTES.HOME}>
            <LogoVercel aria-hidden="true" />
            <span className="text-sm font-medium">{t("TITLE")}</span>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-x-2 lg:gap-x-4">
        {PRIMARY_NAV_CONSTANTS.MENU_LINKS.map((link) => (
          <Button
            key={link.name}
            asChild
            variant="link"
            className="text-muted-foreground hover:text-foreground text-xs hover:no-underline"
          >
            <Link href={link.href}>{t(link.name.toUpperCase())}</Link>
          </Button>
        ))}
      </div>
      <div className="ml-auto">
        <CartNavLink />
      </div>
    </div>
  );
};
