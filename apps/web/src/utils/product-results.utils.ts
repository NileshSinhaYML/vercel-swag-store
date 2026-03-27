import type { ProductsResponse } from "@/types/api/products";

export const isProductsResponse = (
  value: unknown,
): value is ProductsResponse & { success: true } =>
  typeof value === "object" &&
  value !== null &&
  "success" in value &&
  (value as ProductsResponse).success === true &&
  Array.isArray((value as ProductsResponse).data);
