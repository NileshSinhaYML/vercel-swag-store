import { API_ROUTES } from "@/constants/api.routes";
import { env } from "@/env";
import type { ProductsResponse } from "@/types/api/products";
import { cacheLife } from "next/cache";

export const fetchFeaturedProducts = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(
      `${env.SWAG_STORE_API_ENDPOINT}${API_ROUTES.PRODUCTS}?featured=true`,
      {
        headers: {
          "x-vercel-protection-bypass": env.SWAG_STORE_API_TOKEN,
        },
      },
    );
    const data = (await response.json()) as Awaited<ProductsResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return null;
  }
};
