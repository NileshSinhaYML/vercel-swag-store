import { Main } from "@/components/Main";
import { SearchPageFallback } from "@/components/SearchPage/SearchPageFallback";
import { SearchPageTemplate } from "@/templates/SearchPage.template";
import type { AppSearchParamsRecord } from "@/types/components/search.types";
import { parseSearchParamsRecordToQueryParams } from "@/utils/search.utils";
import type { FC } from "react";
import { Suspense } from "react";
import { fetchAllCategories } from "@/app/[locale]/search/actions";

export interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const SearchPage: FC<SearchPageProps> = async (props) => {
  const resolvedSearchParams = await props.searchParams;
  const categoriesResponse = await fetchAllCategories();
  const categories = categoriesResponse?.data ?? [];
  const initialQueryParams = parseSearchParamsRecordToQueryParams(
    resolvedSearchParams as AppSearchParamsRecord,
    categories,
  );
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <Main>
        <SearchPageTemplate
          categories={categories}
          initialQueryParams={initialQueryParams}
        />
      </Main>
    </Suspense>
  );
};

export default SearchPage;
