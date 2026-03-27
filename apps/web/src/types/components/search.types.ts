import type { ProductsResponse } from "@/types/api/products";

export type SearchQueryParams = {
  page: number;
  limit: number;
  search: string;
  category: string;
};

export type SearchResultsState = {
  queryParams: SearchQueryParams;
  searchResults: ProductsResponse | null;
  setQueryParams: (params: Partial<SearchQueryParams>) => void;
  setSearchResults: (results: ProductsResponse | null) => void;
  reset: () => void;
};

export type AppSearchParamsRecord = Partial<
  Record<"search" | "category" | "page" | "limit", string | string[]>
>;

export type SearchQueryParamsRaw = {
  search: string;
  category: string;
  page: string;
  limit: string;
};
