import { API_ROUTES } from "@/constants/api.routes";
import { CACHE_TAGS } from "@/server/cache-tags";
import { fetchCachedUpstreamJson } from "@/server/cached-upstream";
import { swagStoreApiUrl } from "@/server/swag-store-api.fetch";
import type { CategoriesResponse } from "@/types/api/categories";
import type { SearchQueryParams } from "@/types/components/search.types";
import type { ProductsResponse } from "@/types/api/products";
import { buildSearchApiQueryString } from "@/utils/search.utils";

export const fetchAllCategories = async () =>
  fetchCachedUpstreamJson<CategoriesResponse>(
    swagStoreApiUrl(API_ROUTES.CATEGORIES),
    [CACHE_TAGS.categories],
  );

export const fetchSearchProducts = async (params: SearchQueryParams) => {
  const searchParams = buildSearchApiQueryString(params);
  const searchKey = searchParams || "browse";
  return fetchCachedUpstreamJson<ProductsResponse>(
    swagStoreApiUrl(`${API_ROUTES.PRODUCTS}?${searchParams}`),
    [CACHE_TAGS.products, CACHE_TAGS.search(searchKey)],
  );
};
