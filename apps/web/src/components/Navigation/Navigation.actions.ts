import { API_ROUTES } from "@/constants/api.routes";
import { CACHE_TAGS } from "@/server/cache-tags";
import { fetchCachedUpstreamJson } from "@/server/cached-upstream";
import { swagStoreApiUrl } from "@/server/swag-store-api.fetch";
import type { PromoCodeResponse } from "@/types/api/promo-code";

export const fetchPromoCode = async () =>
  fetchCachedUpstreamJson<PromoCodeResponse>(
    swagStoreApiUrl(API_ROUTES.PROMOTIONS),
    [CACHE_TAGS.promotions],
  );
