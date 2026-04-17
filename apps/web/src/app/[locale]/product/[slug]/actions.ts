import { API_ROUTES } from "@/constants/api.routes";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import type {
  ProductDetailsResponse,
  ProductStockResponse,
} from "@/types/api/product-details";
import { cacheLife } from "next/cache";

export const fetchProductDetails = async (slug: string) => {
  "use cache: remote";
  cacheLife("default");

  try {
    const response = await fetch(
      swagStoreApiUrl(`${API_ROUTES.PRODUCTS}/${slug}`),
      { headers: { ...swagStoreApiAuthHeaders } },
    );
    const data = (await response.json()) as Awaited<ProductDetailsResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const fetchProductStock = async (slug: string) => {
  "use cache: remote";
  cacheLife("default");

  try {
    const response = await fetch(
      swagStoreApiUrl(`${API_ROUTES.PRODUCTS}/${slug}/stock`),
      { headers: { ...swagStoreApiAuthHeaders } },
    );
    const data = (await response.json()) as Awaited<ProductStockResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching product stock:", error);
    return null;
  }
};
