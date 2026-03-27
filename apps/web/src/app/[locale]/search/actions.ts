import { API_ROUTES } from "@/constants/api.routes";
import { env } from "@/env";
import type { CategoriesResponse } from "@/types/api/categories";
import { cacheLife } from "next/cache";

export const fetchAllCategories = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(
      `${env.SWAG_STORE_API_ENDPOINT}${API_ROUTES.CATEGORIES}`,
      {
        headers: {
          "x-vercel-protection-bypass": env.SWAG_STORE_API_TOKEN,
        },
      },
    );
    const data = (await response.json()) as Awaited<CategoriesResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};
