import type { PrimaryNavMenuLink } from "../../../types/components/PrimaryNav.types";

export const PRIMARY_NAV_CONSTANTS = {
  TITLE: "Swag Store",
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
