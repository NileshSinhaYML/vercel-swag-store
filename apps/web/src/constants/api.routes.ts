export const API_ROUTES = {
  PROMOTIONS: "/promotions",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  PRODUCTS_PROXY: "/api/search",
} as const satisfies Record<string, string>;
