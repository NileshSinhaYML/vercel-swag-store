import { RouteSegmentLoadingFallback } from "@/components/RouteSegmentLoadingFallback";
import { Main } from "@/components/Main";
import { HomePageTemplate } from "@/templates/HomePage.template";
import type { FC } from "react";
import { Suspense } from "react";

const Page: FC = () => (
  <Suspense fallback={<RouteSegmentLoadingFallback />}>
    <Main>
      <HomePageTemplate />
    </Main>
  </Suspense>
);

export default Page;
