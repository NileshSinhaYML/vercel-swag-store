import { NavigationPromo } from "@/components/Navigation/NavigationPromo";
import { PrimaryNav } from "@/components/Navigation/PrimaryNav";
import { Suspense } from "react";
import type { FC } from "react";
import { PrimaryNavFallback } from "@/components/Navigation/PrimaryNav/PrimaryNavFallback";

export const Navigation: FC = () => (
  <nav className="sticky top-0 right-0 left-0 z-10 bg-white/80 backdrop-blur-sm">
    <Suspense fallback={<PrimaryNavFallback />}>
      <PrimaryNav />
    </Suspense>
    <Suspense fallback={null}>
      <NavigationPromo />
    </Suspense>
  </nav>
);
