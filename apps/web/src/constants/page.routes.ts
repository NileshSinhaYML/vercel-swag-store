export const PAGE_ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product",
  CART: "/cart",
  SEARCH: "/search",
} as const satisfies Record<string, string>;
