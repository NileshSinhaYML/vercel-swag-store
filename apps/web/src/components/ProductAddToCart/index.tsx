"use client";

import { APP_CONSTANTS } from "@/constants/app.constants";
import { Link } from "@/i18n/navigation";
import { getLineQuantity, useCartStore } from "@/stores/cart.store";
import { Button } from "@ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { PAGE_ROUTES } from "@/constants/page.routes";

export interface ProductAddToCartProps {
  productId: string;
  stock: number;
  isOutOfStock: boolean;
}

export const ProductAddToCart: FC<Readonly<ProductAddToCartProps>> = ({
  productId,
  stock,
  isOutOfStock,
}) => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.PDP);
  const cart = useCartStore((s) => s.cart);
  const isBusy = useCartStore((s) => s.isBusy);
  const cartError = useCartStore((s) => s.error);
  const addProduct = useCartStore((s) => s.addProduct);
  const maxStock = isOutOfStock ? 0 : Math.max(0, stock);
  const inCart = getLineQuantity(cart, productId);
  const canAddMore = Math.max(0, maxStock - inCart);
  const [toAdd, setToAdd] = useState(1);

  useEffect(() => {
    void useCartStore.getState().refreshCart();
  }, [productId]);

  const resolvedToAdd = useMemo(() => {
    if (canAddMore <= 0) return 0;
    return Math.min(Math.max(1, toAdd), canAddMore);
  }, [canAddMore, toAdd]);

  const bumpToAdd = useCallback(
    (delta: number) => {
      if (canAddMore <= 0) return;
      setToAdd((q) => {
        const next = Math.min(Math.max(1, q + delta), canAddMore);
        return next;
      });
    },
    [canAddMore],
  );

  const commitAdd = useCallback(async () => {
    const cartNow = useCartStore.getState().cart;
    const inCartNow = getLineQuantity(cartNow, productId);
    const ceiling = Math.max(0, maxStock - inCartNow);
    const qty = Math.min(resolvedToAdd, ceiling);
    if (ceiling <= 0 || qty < 1) return;
    await addProduct(productId, qty);
    setToAdd(1);
  }, [addProduct, maxStock, productId, resolvedToAdd]);

  if (maxStock === 0) {
    return null;
  }

  return (
    <section
      className="border-border/80 bg-card/40 rounded-2xl border p-6 shadow-sm lg:p-8"
      aria-label={t("PURCHASE_SECTION_LABEL")}
    >
      {cartError && (
        <p className="text-destructive mb-4 text-sm" role="alert">
          {cartError}
        </p>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {t("CART_ADD_QUANTITY_LABEL")}
          </span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-4">
            <div
              className={cn(
                "border-input bg-background flex h-11 shrink-0 items-stretch overflow-hidden rounded-xl border shadow-sm",
                "ring-offset-background focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2",
              )}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 rounded-none rounded-l-xl"
                disabled={resolvedToAdd <= 1 || canAddMore <= 0 || isBusy}
                aria-label={t("CART_DECREASE_ADD")}
                onClick={() => bumpToAdd(-1)}
              >
                <Minus className="size-4" aria-hidden />
              </Button>
              <span
                className="flex min-w-[2.75rem] items-center justify-center text-base font-semibold tabular-nums"
                aria-live="polite"
              >
                {resolvedToAdd}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 rounded-none rounded-r-xl"
                disabled={
                  resolvedToAdd >= canAddMore || canAddMore <= 0 || isBusy
                }
                aria-label={t("CART_INCREASE_ADD")}
                onClick={() => bumpToAdd(1)}
              >
                <Plus className="size-4" aria-hidden />
              </Button>
            </div>

            <Button
              type="button"
              variant="default"
              size="lg"
              className="h-11 w-full min-w-0 shrink-0 px-8 text-base font-semibold sm:w-auto sm:min-w-[12rem]"
              disabled={canAddMore <= 0 || resolvedToAdd < 1 || isBusy}
              onClick={() => void commitAdd()}
            >
              {t("ADD_TO_CART")}
            </Button>
          </div>
        </div>

        <div className="border-border/60 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground -ml-2 h-auto gap-1.5 px-2 py-2 font-medium"
          >
            <Link
              href={PAGE_ROUTES.CART}
              className="inline-flex items-center gap-1.5"
            >
              {t("VIEW_CART")}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
