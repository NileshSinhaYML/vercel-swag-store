import { SEARCH_PAGE_CONSTANTS } from "@/components/SearchPage/SearchPage.constants";
import type { Category } from "@/types/api/categories";
import type {
  AppSearchParamsRecord,
  SearchQueryParams,
  SearchQueryParamsRaw,
} from "@/types/components/search.types";
import { dequal } from "dequal";

export const isSearchQueryParamsEqual: ({
  previousParams,
  currentParams,
}: {
  previousParams: SearchQueryParams;
  currentParams: SearchQueryParams;
}) => boolean = ({ previousParams, currentParams }) =>
  dequal(previousParams, currentParams);

export const normalizeCategorySlug: (
  slug: string,
  categories: Category[],
) => string = (slug, categories) => {
  const trimmedSlug = slug.trim();
  if (!trimmedSlug) return "";
  return (
    categories.find(({ slug: categorySlug }) => categorySlug === trimmedSlug)
      ?.slug ?? ""
  );
};

export const hasActiveSearchQuery: (searchText: string) => boolean = (
  searchText,
) => searchText.trim().length > 0;

export const limitForSearchState: (searchText: string) => number = (
  searchText,
) =>
  hasActiveSearchQuery(searchText)
    ? SEARCH_PAGE_CONSTANTS.SEARCH_WITH_QUERY_LIMIT
    : SEARCH_PAGE_CONSTANTS.SEARCH_BROWSE_LIMIT;

export const mergeSearchCommitPartial: (
  previous: SearchQueryParams,
  partial: Partial<SearchQueryParams>,
  categories: Category[],
) => SearchQueryParams = (previous, partial, categories) => {
  const {
    page: prevPage,
    search: prevSearch,
    category: prevCategory,
  } = previous;
  const {
    page: partialPage,
    search: partialSearch,
    category: partialCategory,
  } = partial;

  const search =
    partialSearch === undefined ? prevSearch : partialSearch.trim();

  const category =
    partialCategory === undefined
      ? prevCategory
      : normalizeCategorySlug(partialCategory, categories);

  let page = prevPage;
  if (partialPage !== undefined) {
    page = partialPage;
  } else if (partialSearch !== undefined) {
    page = 1;
  }

  return {
    search,
    category,
    page,
    limit: limitForSearchState(search),
  };
};

export const buildSearchRequestUrlSearchParams: (
  params: SearchQueryParams,
) => URLSearchParams = (params) => {
  const urlSearchParams = new URLSearchParams();
  const searchTrimmed = params.search.trim();
  const effectiveLimit = limitForSearchState(params.search);
  urlSearchParams.set("page", String(params.page));
  urlSearchParams.set("limit", String(effectiveLimit));
  if (searchTrimmed) urlSearchParams.set("search", searchTrimmed);
  if (params.category) urlSearchParams.set("category", params.category);
  return urlSearchParams;
};

export const buildSearchApiQueryString: (
  params: SearchQueryParams,
) => string = (params) => buildSearchRequestUrlSearchParams(params).toString();

export const buildBrowseUrlSearchParams: (
  params: SearchQueryParams,
) => URLSearchParams = (params) =>
  new URLSearchParams(buildSearchRequestUrlSearchParams(params));

export const searchQueryParamsFromRawFields: (
  raw: Readonly<SearchQueryParamsRaw>,
  categories: Category[],
) => SearchQueryParams = (raw, categories) => {
  const rawSearch = raw.search.trim();
  const rawCategory = raw.category.trim();
  const firstCategoryToken = rawCategory.split(",")[0]?.trim() ?? "";
  const category = normalizeCategorySlug(firstCategoryToken, categories);

  const pageRaw = Number.parseInt(raw.page, 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const limitRaw = Number.parseInt(raw.limit, 10);
  const browsingLimit = Number.isFinite(limitRaw)
    ? Math.min(100, Math.max(1, limitRaw))
    : SEARCH_PAGE_CONSTANTS.SEARCH_BROWSE_LIMIT;
  const limit =
    rawSearch === ""
      ? browsingLimit
      : SEARCH_PAGE_CONSTANTS.SEARCH_WITH_QUERY_LIMIT;

  return {
    search: rawSearch,
    category,
    page,
    limit,
  };
};

export const parseSearchParamsToQueryParams: (
  searchParams: URLSearchParams,
  categories: Category[],
) => SearchQueryParams = (searchParams, categories) =>
  searchQueryParamsFromRawFields(
    {
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
      page: searchParams.get("page") ?? "1",
      limit:
        searchParams.get("limit") ??
        String(SEARCH_PAGE_CONSTANTS.SEARCH_BROWSE_LIMIT),
    },
    categories,
  );

export const pickSearchParam: (
  value: string | string[] | undefined,
) => string = (value) => {
  if (value === undefined) return "";
  return typeof value === "string" ? value : (value[0] ?? "");
};

export const parseSearchParamsRecordToQueryParams: (
  record: AppSearchParamsRecord,
  categories: Category[],
) => SearchQueryParams = (record, categories) =>
  searchQueryParamsFromRawFields(
    {
      search: pickSearchParam(record.search),
      category: pickSearchParam(record.category),
      page: pickSearchParam(record.page) || "1",
      limit:
        pickSearchParam(record.limit) ||
        String(SEARCH_PAGE_CONSTANTS.SEARCH_BROWSE_LIMIT),
    },
    categories,
  );
