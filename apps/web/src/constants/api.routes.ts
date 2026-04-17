export const API_ROUTES = {
  PROMOTIONS: "/promotions",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  SEARCH: "/api/search",
  PRODUCTS_PROXY: "/api/products",
  CART: "/cart",
  CART_CREATE: "/cart/create",
  CART_PROXY: "/api/cart",
} as const satisfies Record<string, string>;
