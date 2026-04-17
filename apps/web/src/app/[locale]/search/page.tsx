import { Main } from "@/components/Main";
import { SearchPageFallback } from "@/components/SearchPage/SearchPageFallback";
import { SearchPageTemplate } from "@/templates/SearchPage.template";
import { APP_CONSTANTS } from "@/constants/app.constants";
import type { AppSearchParamsRecord } from "@/types/components/search.types";
import { getAbsoluteSiteUrl } from "@/server/site-origin";
import { parseSearchParamsRecordToQueryParams } from "@/utils/search.utils";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";
import { Suspense } from "react";
import { fetchAllCategories } from "@/app/[locale]/search/actions";

export interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const generateMetadata = async (
  props: SearchPageProps,
): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations(APP_CONSTANTS.NAME_SPACES.SEARCH_PAGE);
  const title = t("META_TITLE");
  const description = t("META_DESCRIPTION");
  return {
    title,
    description,
    openGraph: {
      url: getAbsoluteSiteUrl(locale, "/search"),
      title,
      description,
      type: "website",
    },
  };
};

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
