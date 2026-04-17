"use client";

import { APP_CONSTANTS } from "@/constants/app.constants";
import { PAGE_ROUTES } from "@/constants/page.routes";
import {
  cartLineMaxQuantity,
  cartLineMinusDisabled,
  cartLinePlusDisabled,
  decrementedLineQuantity,
} from "@/utils/cart.utils";
import { Link } from "@/i18n/navigation";
import type { CartLineItem } from "@/types/api/cart";
import type { ProductStock } from "@/types/api/product-details";
import { Button } from "@ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import type { FC } from "react";

export type CartLineRowProps = {
  line: CartLineItem;
  currency: string;
  stockEntry: ProductStock | null | undefined;
  busyRow: boolean;
  run: (productId: string, fn: () => Promise<void>) => Promise<void>;
  setQuantity: (productId: string, quantity: number) => Promise<void>;
  removeLine: (productId: string) => Promise<void>;
};

export const CartLineRow: FC<CartLineRowProps> = ({
  line,
  currency,
  stockEntry,
  busyRow,
  run,
  setQuantity,
  removeLine,
}) => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.CART);
  const tPdp = useTranslations(APP_CONSTANTS.NAME_SPACES.PDP);
  const formatter = useFormatter();
  const image = line.product.images?.[0];
  const maxStock = cartLineMaxQuantity(stockEntry, line.quantity);
  const minusDisabled = cartLineMinusDisabled(busyRow, line.quantity);
  const plusDisabled = cartLinePlusDisabled(busyRow, line.quantity, maxStock);
  const productHref = `${PAGE_ROUTES.PRODUCT_DETAIL}/${line.product.slug}`;

  return (
    <li className="border-border flex flex-col gap-4 border-b pb-6 last:border-b-0 sm:flex-row sm:items-start">
      <Link
        href={productHref}
        className="relative mx-auto block size-28 shrink-0 overflow-hidden rounded-md sm:mx-0 sm:size-32"
      >
        {image ? (
          <Image
            src={image}
            alt={line.product.name}
            width={128}
            height={128}
            className="size-full object-cover"
          />
        ) : (
          <span className="bg-muted text-muted-foreground flex size-full items-center justify-center text-xs">
            {t("NO_IMAGE")}
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <Link href={productHref} className="font-semibold hover:underline">
            {line.product.name}
          </Link>
          <span className="text-muted-foreground text-sm tabular-nums sm:text-right">
            {formatter.number(line.product.price, {
              style: "currency",
              currency,
            })}{" "}
            × {line.quantity}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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
              disabled={minusDisabled}
              aria-label={tPdp("CART_DECREASE_ADD")}
              onClick={() =>
                void run(line.productId, () =>
                  setQuantity(
                    line.productId,
                    decrementedLineQuantity(line.quantity),
                  ),
                )
              }
            >
              <Minus className="size-4" aria-hidden />
            </Button>
            <span
              className="border-input flex min-w-[2.75rem] items-center justify-center border-x px-2 text-base font-semibold tabular-nums"
              aria-live="polite"
            >
              {line.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-11 shrink-0 rounded-none rounded-r-xl"
              disabled={plusDisabled}
              aria-label={tPdp("CART_INCREASE_ADD")}
              onClick={() =>
                void run(line.productId, () =>
                  setQuantity(line.productId, line.quantity + 1),
                )
              }
            >
              <Plus className="size-4" aria-hidden />
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 gap-2 px-3"
            disabled={busyRow}
            onClick={() =>
              void run(line.productId, () => removeLine(line.productId))
            }
          >
            <Trash2 className="size-4" aria-hidden />
            {t("REMOVE")}
          </Button>
          <span className="ml-auto text-base font-semibold tabular-nums sm:ml-0">
            {formatter.number(line.lineTotal, {
              style: "currency",
              currency,
            })}
          </span>
        </div>
      </div>
    </li>
  );
};
