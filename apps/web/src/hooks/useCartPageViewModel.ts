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
import type { CartStore } from "@/stores/cart.store";
import type { ProductStockResponse } from "@/types/api/product-details";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useShallow } from "zustand/react/shallow";

export const useCartPageViewModel = () => {
  const { cart, error, isBusy, removeLine, setQuantity } = useCartStore(
    useShallow((state: CartStore) => ({
      cart: state.cart,
      error: state.error,
      isBusy: state.isBusy,
      removeLine: state.removeLine,
      setQuantity: state.setQuantity,
    })),
  );
  const [{ isHydrated, pendingId, stockBySlug }, dispatch] = useReducer(
    cartPageViewReducer,
    initialCartPageViewState,
  );

  useEffect(() => {
    void rehydrateCartStore().finally(() =>
      dispatch({ type: "setIsHydrated" }),
    );
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
    if (!isHydrated || uniqueSlugs.length === 0) return;
    let cancelled = false;
    void Promise.all(
      uniqueSlugs.map(async (slug) => {
        try {
          const res = await fetch(getCartPageProductStockUrl(slug), {
            cache: "no-store",
          });
          const stockResponse = (await res.json()) as ProductStockResponse;
          if (cancelled) return;
          const stock = productStockFromStockApiResponse(res, stockResponse);
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
  }, [isHydrated, uniqueSlugs]);

  return {
    cart,
    error,
    isHydrated,
    isBusy,
    items: cart?.items ?? [],
    pendingId,
    removeLine,
    run,
    setQuantity,
    stockBySlug,
  };
};
