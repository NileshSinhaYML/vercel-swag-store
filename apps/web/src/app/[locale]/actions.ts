import { API_ROUTES } from "@/constants/api.routes";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import type { ProductsResponse } from "@/types/api/products";
import { cacheLife } from "next/cache";

export const fetchFeaturedProducts = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(
      swagStoreApiUrl(`${API_ROUTES.PRODUCTS}?featured=true`),
      { headers: { ...swagStoreApiAuthHeaders } },
    );
    const data = (await response.json()) as Awaited<ProductsResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return null;
  }
};
