import { SearchPageContext } from "@/contexts/SearchPageContext";
import type { CommitSearchToUrl } from "@/contexts/SearchPageContext";
import type { FC, ReactNode } from "react";

export interface SearchPageProviderProps {
  children: ReactNode;
  commitToUrl: CommitSearchToUrl;
}

export const SearchPageProvider: FC<Readonly<SearchPageProviderProps>> = ({
  children,
  commitToUrl,
}) => (
  <SearchPageContext.Provider value={commitToUrl}>
    {children}
  </SearchPageContext.Provider>
);
