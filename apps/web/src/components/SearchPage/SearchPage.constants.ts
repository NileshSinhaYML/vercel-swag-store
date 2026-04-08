export const SEARCH_PAGE_CONSTANTS = {
  SEARCH_DEBOUNCE_MS: 350,
  MIN_AUTO_SEARCH_CHARS: 3,
  SEARCH_BROWSE_LIMIT: 10,
  SEARCH_WITH_QUERY_LIMIT: 5,
} as const satisfies Record<string, number>;
