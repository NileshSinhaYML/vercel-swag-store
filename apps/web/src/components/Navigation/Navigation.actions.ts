import { API_ROUTES } from "@/constants/api.routes";
import { env } from "@/env";
import type { PromoCodeResponse } from "@/types/api/promo-code";
import { cacheLife } from "next/cache";

export const fetchPromoCode = async () => {
  "use cache: remote";
  cacheLife("default");
  try {
    const response = await fetch(
      `${process.env.SWAG_STORE_API_ENDPOINT}${API_ROUTES.PROMOTIONS}`,
      {
        headers: {
          "x-vercel-protection-bypass": env.SWAG_STORE_API_TOKEN,
        },
      },
    );
    const data = (await response.json()) as Awaited<PromoCodeResponse>;
    return data;
  } catch (error) {
    console.error("Error fetching promo code:", error);
    return null;
  }
};
