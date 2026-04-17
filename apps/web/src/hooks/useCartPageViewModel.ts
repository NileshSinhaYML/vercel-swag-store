"use client";

import {
  cartPageViewReducer,
  initialCartPageViewState,
} from "@/reducers/CartPageView.reducer";
import {
  getCartPageProductStockUrl,
  productStockFromStockApiResponse,
  sortedUniqueCartProductSlugs,
} from "@/utils/cart.utils";
import { rehydrateCartStore, useCartStore } from "@/stores/cart.store";
import type { ProductStockResponse } from "@/types/api/product-details";
import { useCallback, useEffect, useMemo, useReducer } from "react";

export const useCartPageViewModel = () => {
  const cart = useCartStore((s) => s.cart);
  const isBusy = useCartStore((s) => s.isBusy);
  const error = useCartStore((s) => s.error);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const [{ hydrated, pendingId, stockBySlug }, dispatch] = useReducer(
    cartPageViewReducer,
    initialCartPageViewState,
  );

  useEffect(() => {
    void rehydrateCartStore().finally(() => dispatch({ type: "hydrated" }));
  }, []);

  const run = useCallback(
    async (productId: string, fn: () => Promise<void>) => {
      dispatch({ type: "pendingId", pendingId: productId });
      try {
        await fn();
      } catch (error_) {
        console.error("Error in run callback:", error_);
      } finally {
        dispatch({ type: "pendingId", pendingId: null });
      }
    },
    [],
  );

  const uniqueSlugs = useMemo(
    () => sortedUniqueCartProductSlugs(cart?.items),
    [cart?.items],
  );

  useEffect(() => {
    if (!hydrated || uniqueSlugs.length === 0) return;
    let cancelled = false;
    void Promise.all(
      uniqueSlugs.map(async (slug) => {
        try {
          const res = await fetch(getCartPageProductStockUrl(slug), {
            cache: "no-store",
          });
          const json = (await res.json()) as ProductStockResponse;
          if (cancelled) return;
          const stock = productStockFromStockApiResponse(res, json);
          dispatch({
            type: "stockForSlug",
            slug,
            stock,
          });
        } catch {
          if (!cancelled) {
            dispatch({ type: "stockForSlug", slug, stock: null });
          }
        }
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [hydrated, uniqueSlugs]);

  return {
    cart,
    error,
    hydrated,
    isBusy,
    items: cart?.items ?? [],
    pendingId,
    removeLine,
    run,
    setQuantity,
    stockBySlug,
  };
};
