import { API_ROUTES } from "@/constants/api.routes";
import { CACHE_TAGS } from "@/server/cache-tags";
import { fetchCachedUpstreamJson } from "@/server/cached-upstream";
import { swagStoreApiUrl } from "@/server/swag-store-api.fetch";
import type {
  ProductDetailsResponse,
  ProductStockResponse,
} from "@/types/api/product-details";

export const fetchProductDetails = async (slug: string) =>
  fetchCachedUpstreamJson<ProductDetailsResponse>(
    swagStoreApiUrl(`${API_ROUTES.PRODUCTS}/${slug}`),
    [CACHE_TAGS.products, CACHE_TAGS.product(slug)],
  );

export const fetchProductStock = async (slug: string) =>
  fetchCachedUpstreamJson<ProductStockResponse>(
    swagStoreApiUrl(`${API_ROUTES.PRODUCTS}/${slug}/stock`),
    [CACHE_TAGS.products, CACHE_TAGS.productStock(slug)],
  );
