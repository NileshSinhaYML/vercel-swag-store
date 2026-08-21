import { SearchPage } from "@/components/SearchPage/SearchPage";
import type { Category } from "@/types/api/categories";
import type { SearchQueryParams } from "@/types/components/search.types";
import type { ProductsResponse } from "@/types/api/products";
import type { FC } from "react";

export interface SearchPageTemplateProps {
  categories: Category[];
  initialQueryParams: SearchQueryParams;
  initialProducts: ProductsResponse | null;
}

export const SearchPageTemplate: FC<Readonly<SearchPageTemplateProps>> = ({
  categories,
  initialQueryParams,
  initialProducts,
}) => (
  <SearchPage
    categories={categories}
    initialQueryParams={initialQueryParams}
    initialProducts={initialProducts}
  />
);
