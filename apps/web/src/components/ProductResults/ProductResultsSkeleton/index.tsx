import type { FC } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface ProductResultsSkeletonProps {
  isSearchActive: boolean;
}

export const ProductResultsSkeleton: FC<
  Readonly<ProductResultsSkeletonProps>
> = ({ isSearchActive }) => {
  const count = isSearchActive ? 5 : 8;
  return (
    <div
      className={cn(
        "grid gap-4 lg:gap-8",
        isSearchActive
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div className="bg-muted/40 h-72 animate-pulse rounded-lg" key={i} />
      ))}
    </div>
  );
};
