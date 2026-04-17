import { API_ROUTES } from "@/constants/api.routes";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import type { CategoriesResponse } from "@/types/api/categories";
import { cacheLife } from "next/cache";

export const fetchAllCategories = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(swagStoreApiUrl(API_ROUTES.CATEGORIES), {
      headers: { ...swagStoreApiAuthHeaders },
    });
    const data = (await response.json()) as Awaited<CategoriesResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};
