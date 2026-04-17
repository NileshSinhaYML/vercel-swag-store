export const APP_CONSTANTS = {
  NAME_SPACES: {
    NAVIGATION: "NAVIGATION",
    FOOTER: "FOOTER",
    SITE_METADATA: "SITE_METADATA",
    HOME_PAGE: "HOME_PAGE",
    PDP: "PDP",
    SEARCH_PAGE: "SEARCH_PAGE",
    CART: "CART",
  },
  CART_SUMMARY_ESTIMATED_TAX_RATE: 0,
} as const satisfies Record<string, unknown>;
