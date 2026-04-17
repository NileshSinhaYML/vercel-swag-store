import type { ProductStock } from "@/types/api/product-details";

export type CartPageViewState = {
  hydrated: boolean;
  pendingId: string | null;
  stockBySlug: Record<string, ProductStock | null>;
};

export type CartPageViewAction =
  | { type: "hydrated" }
  | { type: "pendingId"; pendingId: string | null }
  | { type: "stockForSlug"; slug: string; stock: ProductStock | null };
