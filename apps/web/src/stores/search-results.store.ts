import type {
  SearchQueryParams,
  SearchResultsState,
} from "@/types/components/search.types";
import { create } from "zustand";
import { SEARCH_PAGE_CONSTANTS } from "@/components/SearchPage/SearchPage.constants";
import { isSearchQueryParamsEqual } from "@/utils/search.utils";

const defaultQueryParams: SearchQueryParams = {
  page: 1,
  limit: SEARCH_PAGE_CONSTANTS.SEARCH_BROWSE_LIMIT,
  search: "",
  category: "",
};

export const useSearchResultsStore = create<SearchResultsState>((set) => ({
  queryParams: { ...defaultQueryParams },
  searchResults: null,
  setQueryParams: (params) =>
    set((state) => {
      const queryParams = { ...state.queryParams, ...params };
      if (
        isSearchQueryParamsEqual({
          previousParams: state.queryParams,
          currentParams: queryParams,
        })
      ) {
        return state;
      }
      return { queryParams };
    }),
  setSearchResults: (searchResults) => set({ searchResults }),
  reset: () =>
    set({
      queryParams: { ...defaultQueryParams },
      searchResults: null,
    }),
}));
