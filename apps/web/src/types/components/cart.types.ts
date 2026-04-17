import type { ProductStock } from "@/types/api/product-details";

export type CartPageViewState = {
  isHydrated: boolean;
  pendingId: string | null;
  stockBySlug: Record<string, ProductStock | null>;
};

export type CartPageViewAction =
  | { type: "setIsHydrated" }
  | { type: "pendingId"; pendingId: string | null }
  | { type: "stockForSlug"; slug: string; stock: ProductStock | null };
