"use client";

import { CategorySelect } from "@/components/CategorySelect";
import { ProductResults } from "@/components/ProductResults";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchResultsStore } from "@/stores/search-results.store";
import {
  buildBrowseUrlSearchParams,
  mergeSearchCommitPartial,
  parseSearchParamsToQueryParams,
} from "@/utils/search.utils";
import type {
  SearchQueryParams,
  SearchResultsState,
} from "@/types/components/search.types";
import type { Category } from "@/types/api/categories";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FC } from "react";
import { SEARCH_PAGE_CONSTANTS } from "@/components/SearchPage/SearchPage.constants";
import { SearchPageProvider } from "@/providers/SearchPageProvider";
import type { CommitSearchToUrl } from "@/contexts/SearchPageContext";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";

export interface SearchPageProps {
  readonly categories: Category[];
  readonly initialQueryParams: SearchQueryParams;
}

export const SearchPage: FC<Readonly<SearchPageProps>> = ({
  categories,
  initialQueryParams,
}) => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.SEARCH_PAGE);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { queryParams, setQueryParams } = useSearchResultsStore(
    useShallow((state: SearchResultsState) => ({
      queryParams: state.queryParams,
      setQueryParams: state.setQueryParams,
    })),
  );
  const prevUrlSyncKey = useRef<string | null>(null);
  const [urlReady, setUrlReady] = useState(false);

  const categorySlugs = useMemo(
    () =>
      categories
        .map((c) => c.slug)
        .toSorted((a, b) => a.localeCompare(b))
        .join("\0"),
    [categories],
  );

  useLayoutEffect(() => {
    const url = searchParams.toString();
    const key = `${url}::${categorySlugs}`;
    if (prevUrlSyncKey.current !== key) {
      prevUrlSyncKey.current = key;
      const parsed = parseSearchParamsToQueryParams(searchParams, categories);
      setQueryParams(parsed);
    }
    setTimeout(() => setUrlReady(true), 0);
  }, [searchParams, categorySlugs, categories, setQueryParams]);

  const commitToUrl = useCallback<CommitSearchToUrl>(
    (partial) => {
      const newParams = mergeSearchCommitPartial(
        useSearchResultsStore.getState().queryParams,
        partial,
        categories,
      );
      setQueryParams(newParams);
      const urlParams = buildBrowseUrlSearchParams(newParams).toString();
      router.replace(urlParams ? `${pathname}?${urlParams}` : pathname, {
        scroll: false,
      });
      setUrlReady(true);
    },
    [categories, pathname, router, setQueryParams],
  );

  const displayParams = urlReady ? queryParams : initialQueryParams;
  const [searchDraft, setSearchDraft] = useState(initialQueryParams.search);

  useEffect(() => {
    setTimeout(() => setSearchDraft(queryParams.search), 0);
  }, [queryParams.search]);

  const submitSearch = useCallback(() => {
    commitToUrl({ search: searchDraft, page: 1 });
  }, [commitToUrl, searchDraft]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const trimmed = searchDraft.trim();
      const committed = queryParams.search;
      if (trimmed === committed) return;
      const allowAutoClear = trimmed.length === 0;
      const allowAutoQuery =
        trimmed.length >= SEARCH_PAGE_CONSTANTS.MIN_AUTO_SEARCH_CHARS;
      if (!allowAutoClear && !allowAutoQuery) return;
      commitToUrl({ search: trimmed, page: 1 });
    }, SEARCH_PAGE_CONSTANTS.SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchDraft, queryParams.search, commitToUrl]);

  return (
    <SearchPageProvider commitToUrl={commitToUrl}>
      <div className="col-span-full flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="search-query">{t("SEARCH_LABEL")}</Label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <Input
                id="search-query"
                name="q"
                type="search"
                placeholder={t("SEARCH_PLACEHOLDER")}
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitSearch();
                  }
                }}
                autoComplete="off"
                className="min-w-0 sm:flex-1"
              />
              <Button
                type="button"
                className="shrink-0 gap-2 sm:w-auto"
                onClick={submitSearch}
              >
                <SearchIcon className="size-4 shrink-0" aria-hidden />
                {t("SEARCH_BUTTON")}
              </Button>
            </div>
          </div>

          {categories.length > 0 && (
            <CategorySelect
              categories={categories}
              value={displayParams.category}
              onChange={(slug) => commitToUrl({ category: slug, page: 1 })}
            />
          )}
        </div>

        {urlReady ? (
          <ProductResults />
        ) : (
          <div className="border-border flex min-h-[12rem] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground text-sm">
              {t("LOADING_PRODUCTS")}
            </p>
          </div>
        )}
      </div>
    </SearchPageProvider>
  );
};
