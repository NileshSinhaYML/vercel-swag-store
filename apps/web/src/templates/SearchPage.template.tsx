import { SearchPage } from "@/components/SearchPage/SearchPage";
import type { Category } from "@/types/api/categories";
import type { SearchQueryParams } from "@/types/components/search.types";
import type { FC } from "react";

export interface SearchPageTemplateProps {
  categories: Category[];
  initialQueryParams: SearchQueryParams;
}

export const SearchPageTemplate: FC<Readonly<SearchPageTemplateProps>> = ({
  categories,
  initialQueryParams,
}) => (
  <SearchPage categories={categories} initialQueryParams={initialQueryParams} />
);
