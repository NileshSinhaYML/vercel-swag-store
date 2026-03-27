"use client";

import type { SearchQueryParams } from "@/types/components/search.types";
import { createContext, use } from "react";

export type CommitSearchToUrl = (partial: Partial<SearchQueryParams>) => void;

export const SearchPageContext = createContext<CommitSearchToUrl | null>(null);

export const useSearchPageContext = () => {
  const context = use(SearchPageContext);
  if (!context) {
    throw new Error(
      "useSearchPageContext must be used within SearchPageProvider",
    );
  }
  return context;
};
