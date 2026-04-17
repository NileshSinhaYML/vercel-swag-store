import { RouteSegmentLoadingFallback } from "@/components/RouteSegmentLoadingFallback";
import { Main } from "@/components/Main";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { getAbsoluteSiteUrl } from "@/server/site-origin";
import { HomePageTemplate } from "@/templates/HomePage.template";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";
import { Suspense } from "react";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async (
  props: HomePageProps,
): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations(APP_CONSTANTS.NAME_SPACES.SITE_METADATA);
  const title = t("DEFAULT_META_TITLE");
  const description = t("DESCRIPTION");
  return {
    title,
    description,
    openGraph: {
      url: getAbsoluteSiteUrl(locale, "/"),
      title,
      description,
      type: "website",
    },
  };
};

const Page: FC<HomePageProps> = () => (
  <Suspense fallback={<RouteSegmentLoadingFallback />}>
    <Main>
      <HomePageTemplate />
    </Main>
  </Suspense>
);

export default Page;
