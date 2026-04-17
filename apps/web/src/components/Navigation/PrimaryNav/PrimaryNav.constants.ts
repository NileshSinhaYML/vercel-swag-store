import { PAGE_ROUTES } from "@/constants/page.routes";
import type { PrimaryNavMenuLink } from "@/types/components/primary-nav.types";

export const PRIMARY_NAV_CONSTANTS = {
  MENU_LINKS: [
    {
      name: "Home",
      href: PAGE_ROUTES.HOME,
    },
    {
      name: "Search",
      href: PAGE_ROUTES.SEARCH,
    },
  ],
} as const satisfies Readonly<Record<string, string | PrimaryNavMenuLink[]>>;
