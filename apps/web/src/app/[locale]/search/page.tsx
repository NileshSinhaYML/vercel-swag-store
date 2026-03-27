import { fetchAllCategories } from "@/app/[locale]/search/actions";
import { Main } from "@/components/Main";
import { SearchPageClient } from "@/components/SearchPage/SearchPageClient";
import type { AppSearchParamsRecord } from "@/types/components/search.types";
import { parseSearchParamsRecordToQueryParams } from "@/utils/search.utils";
import type { FC } from "react";
import { Suspense } from "react";

 

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const SearchPageFallback: FC = () => (
  <div className="border-border col-span-full flex min-h-[12rem] items-center justify-center rounded-lg border border-dashed px-4 py-10">
    <p className="text-muted-foreground text-sm">Loading search…</p>
  </div>
);

const Page: FC<SearchPageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const categoriesResponse = await fetchAllCategories();
  const categories = categoriesResponse?.data ?? [];
  const initialQueryParams = parseSearchParamsRecordToQueryParams(
    resolvedSearchParams as AppSearchParamsRecord,
    categories,
  );

  return (
    <Main>
      <Suspense fallback={<SearchPageFallback />}>
        <SearchPageClient
          categories={categories}
          initialQueryParams={initialQueryParams}
        />
      </Suspense>
    </Main>
  );
};

export default Page;
