import { API_ROUTES } from "@/constants/api.routes";
import type { ProductsResponse } from "@/types/api/products";
import { cacheLife } from "next/cache";

export const getFeaturedProducts = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(
      `${process.env.SWAG_STORE_API_ENDPOINT}${API_ROUTES.PRODUCTS}?featured=true`,
    );
    const data = (await response.json()) as Awaited<ProductsResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return null;
  }
};
