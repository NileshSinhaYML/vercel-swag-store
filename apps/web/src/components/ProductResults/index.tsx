"use client";

import { ProductCard } from "@/components/ProductCard";
import { useSearchResultsStore } from "@/stores/search-results.store";
import type { SearchResultsState } from "@/types/components/search.types";
import {
  buildSearchApiQueryString,
  hasActiveSearchQuery,
} from "@/utils/search.utils";
import { cn } from "@ui/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ProductResultsSkeleton } from "@/components/ProductResults/ProductResultsSkeleton";
import { isProductsResponse } from "@/utils/product-results.utils";
import type { ProductsResponse } from "@/types/api/products";
import { API_ROUTES } from "@/constants/api.routes";
import { ProductsPagination } from "@/components/ProductResults/ProductsPagination";
import { useSearchPageContext } from "@/contexts/SearchPageContext";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { useTranslations } from "next-intl";

export const ProductResults = () => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.SEARCH_PAGE);
  const commitToUrl = useSearchPageContext();
  const { queryParams, searchResults, setSearchResults } =
    useSearchResultsStore(
      useShallow((state: SearchResultsState) => ({
        queryParams: state.queryParams,
        searchResults: state.searchResults,
        setSearchResults: state.setSearchResults,
      })),
    );

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isSearchActive = hasActiveSearchQuery(queryParams.search);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    setSearchResults(null);
    const searchParams = buildSearchApiQueryString(queryParams);
    const url = `${API_ROUTES.SEARCH}?${searchParams}`;
    try {
      const response = await fetch(url);
      const body = (await response.json()) as Awaited<ProductsResponse>;
      if (!response.ok) {
        const message =
          "error" in body && typeof body.error === "string"
            ? body.error
            : t("ERROR_LOAD_PRODUCTS");
        setFetchError(message);
        setSearchResults(null);
        return;
      }
      if (!isProductsResponse(body)) {
        setFetchError(t("ERROR_UNEXPECTED"));
        setSearchResults(null);
        return;
      }
      setSearchResults(body);
    } catch {
      setFetchError(t("ERROR_LOAD_PRODUCTS"));
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, setSearchResults, t]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const pagination = searchResults?.meta?.pagination;
  const products = searchResults?.data ?? [];

  const showPagination = !isSearchActive && pagination && products.length > 0;

  const searchEmptyText = isSearchActive
    ? t("EMPTY_RESULTS_SEARCH")
    : t("EMPTY_RESULTS_BROWSE");

  return (
    <div className="flex flex-col gap-8">
      <div aria-live="polite">
        {isLoading && (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              {t("SEARCHING_STATUS")}
            </p>
            <ProductResultsSkeleton isSearchActive={isSearchActive} />
          </div>
        )}
      </div>
      {!isLoading && fetchError && (
        <p className="text-destructive text-sm" role="alert">
          {fetchError}
        </p>
      )}
      {!isLoading && !fetchError && products.length === 0 && (
        <p className="text-muted-foreground text-sm">{searchEmptyText}</p>
      )}
      {!isLoading && !fetchError && products.length > 0 && (
        <div
          className={cn(
            "grid gap-4 lg:gap-8",
            isSearchActive
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              : "grid-cols-12",
          )}
        >
          {products.map((product, index) => (
            <div
              className={cn({
                "col-span-full sm:col-span-6 lg:col-span-4": !isSearchActive,
              })}
              key={product.id}
            >
              <ProductCard {...product} shouldLoadEager={index < 3} />
            </div>
          ))}
        </div>
      )}
      {showPagination && <ProductsPagination commitToUrl={commitToUrl} />}
    </div>
  );
};
