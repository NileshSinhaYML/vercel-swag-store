export const APP_CONSTANTS = {
  NAME_SPACES: {
    NAVIGATION: "NAVIGATION",
    FOOTER: "FOOTER",
    SITE_METADATA: "SITE_METADATA",
    HOME_PAGE: "HOME_PAGE",
    PDP: "PDP",
    SEARCH_PAGE: "SEARCH_PAGE",
  },
} as const satisfies Record<string, unknown>;
