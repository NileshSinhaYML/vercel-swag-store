import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HomepageHero } from "@/components/HomepageHero";
import type { FC } from "react";

export const HomePageTemplate: FC = () => (
  <div className="col-span-full flex flex-col gap-y-4 lg:gap-y-8">
    <HomepageHero />
    <FeaturedProducts />
  </div>
);
