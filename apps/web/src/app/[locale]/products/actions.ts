import { API_ROUTES } from "@/constants/api.routes";
import { env } from "@/env";
import type { CategoriesResponse } from "@/types/api/categories";
import { cacheLife } from "next/cache";

export const getAllCategories = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(
      `${env.SWAG_STORE_API_ENDPOINT}${API_ROUTES.CATEGORIES}`,
    );
    const data = (await response.json()) as Awaited<CategoriesResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};
