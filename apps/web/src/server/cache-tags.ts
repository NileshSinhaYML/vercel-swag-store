export const CACHE_TAGS = {
  products: "products",
  categories: "categories",
  promotions: "promotions",
  product: (slug: string) => `product-${slug}`,
  productStock: (slug: string) => `product-stock-${slug}`,
  search: (queryKey: string) => `search-${queryKey}`,
} as const;
