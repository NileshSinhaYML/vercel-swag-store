import { API_ROUTES } from "@/constants/api.routes";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import type { PromoCodeResponse } from "@/types/api/promo-code";
import { cacheLife } from "next/cache";

export const fetchPromoCode = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(swagStoreApiUrl(API_ROUTES.PROMOTIONS), {
      headers: { ...swagStoreApiAuthHeaders },
    });
    const data = (await response.json()) as Awaited<PromoCodeResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching promo code:", error);
    return null;
  }
};
