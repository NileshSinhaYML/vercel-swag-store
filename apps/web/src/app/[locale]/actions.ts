import { API_ROUTES } from "@/constants/api.routes";
import { CACHE_TAGS } from "@/server/cache-tags";
import { fetchCachedUpstreamJson } from "@/server/cached-upstream";
import { swagStoreApiUrl } from "@/server/swag-store-api.fetch";
import type { ProductsResponse } from "@/types/api/products";

export const fetchFeaturedProducts = async () =>
  fetchCachedUpstreamJson<ProductsResponse>(
    swagStoreApiUrl(`${API_ROUTES.PRODUCTS}?featured=true`),
    [CACHE_TAGS.products],
  );
