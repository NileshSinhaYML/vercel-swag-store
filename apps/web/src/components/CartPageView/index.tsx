"use client";

import { APP_CONSTANTS } from "@/constants/app.constants";
import { CartLineRow } from "@/components/CartPageView/CartLineRow";
import { CartOrderSummary } from "@/components/CartPageView/CartOrderSummary";
import { CartPageHeader } from "@/components/CartPageView/CartPageHeader";
import { CartPageLoader } from "@/components/CartPageView/CartPageLoader";
import { getCartOrderTotals } from "@/utils/cart.utils";
import { useCartPageViewModel } from "@/hooks/useCartPageViewModel";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export const CartPageView: FC = () => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.CART);
  const {
    cart,
    error,
    hydrated,
    isBusy,
    items,
    pendingId,
    removeLine,
    run,
    setQuantity,
    stockBySlug,
  } = useCartPageViewModel();

  const currency = cart?.currency ?? "USD";
  const { estimatedTax, orderTotal } = getCartOrderTotals(cart);

  if (!hydrated) {
    return <CartPageLoader />;
  }

  return (
    <div className="col-span-full flex flex-col gap-8">
      <CartPageHeader title={t("TITLE")} error={error} />

      {items.length === 0 ? (
        <p className="text-muted-foreground">{t("EMPTY")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <ul className="flex flex-col gap-6">
              {items.map((line) => (
                <CartLineRow
                  key={line.productId}
                  line={line}
                  currency={currency}
                  stockEntry={stockBySlug[line.product.slug]}
                  busyRow={isBusy && pendingId === line.productId}
                  run={run}
                  setQuantity={setQuantity}
                  removeLine={removeLine}
                />
              ))}
            </ul>
          </div>

          {cart ? (
            <CartOrderSummary
              cart={cart}
              estimatedTax={estimatedTax}
              orderTotal={orderTotal}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
