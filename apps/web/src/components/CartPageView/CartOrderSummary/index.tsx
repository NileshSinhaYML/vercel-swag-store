"use client";

import { APP_CONSTANTS } from "@/constants/app.constants";
import type { CartPayload } from "@/types/api/cart";
import { useFormatter, useTranslations } from "next-intl";
import type { FC } from "react";

export type CartOrderSummaryProps = {
  cart: CartPayload;
  estimatedTax: number;
  orderTotal: number;
};

export const CartOrderSummary: FC<CartOrderSummaryProps> = ({
  cart,
  estimatedTax,
  orderTotal,
}) => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.CART);
  const formatter = useFormatter();

  return (
    <aside className="lg:col-span-5">
      <div className="border-border bg-muted/20 space-y-4 rounded-xl border p-6 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]">
        <h2 className="text-lg font-semibold">{t("ORDER_SUMMARY")}</h2>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt>{t("SUBTOTAL")}</dt>
            <dd className="tabular-nums">
              {formatter.number(cart.subtotal, {
                style: "currency",
                currency: cart.currency,
              })}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>{t("ESTIMATED_TAX")}</dt>
            <dd className="tabular-nums">
              {estimatedTax === 0
                ? "-"
                : formatter.number(estimatedTax, {
                    style: "currency",
                    currency: cart.currency,
                  })}
            </dd>
          </div>
          <div className="border-border flex items-center justify-between gap-4 border-t pt-3 text-base font-semibold">
            <dt>{t("TOTAL")}</dt>
            <dd className="tabular-nums">
              {formatter.number(orderTotal, {
                style: "currency",
                currency: cart.currency,
              })}
            </dd>
          </div>
        </dl>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {t("TAX_NOTE")}
        </p>
      </div>
    </aside>
  );
};
