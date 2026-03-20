import type { PrimaryNavMenuLink } from "@/types/components/primary-nav.types";

export const PRIMARY_NAV_CONSTANTS = {
  MENU_LINKS: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Search",
      href: "/search",
    },
  ],
} as const satisfies Readonly<Record<string, string | PrimaryNavMenuLink[]>>;
