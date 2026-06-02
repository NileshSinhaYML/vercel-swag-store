import { cacheLife, cacheTag } from "next/cache";
import { swagStoreApiAuthHeaders } from "@/server/swag-store-api.fetch";

export const fetchCachedUpstreamJson = async <T>(
  url: string,
  tags: readonly string[],
): Promise<T | null> => {
  "use cache: remote";
  cacheLife("default");
  for (const tag of tags) {
    cacheTag(tag);
  }
  try {
    const response = await fetch(url, {
      headers: { ...swagStoreApiAuthHeaders },
    });
    if (!response.ok) {
      console.error(`Upstream fetch failed (${response.status}): ${url}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Upstream fetch error: ${url}`, error);
    return null;
  }
};
