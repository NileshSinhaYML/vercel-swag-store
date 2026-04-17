"use client";

import { APP_CONSTANTS } from "@/constants/app.constants";
import { Link } from "@/i18n/navigation";
import { selectCartTotalItems, useCartStore } from "@/stores/cart.store";
import type { CartStore } from "@/stores/cart.store";
import { Button } from "@ui/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { PAGE_ROUTES } from "@/constants/page.routes";
import { useShallow } from "zustand/react/shallow";

export const CartNavLink = () => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.NAVIGATION);
  const { totalItems } = useCartStore(
    useShallow((state: CartStore) => ({
      totalItems: selectCartTotalItems(state),
    })),
  );
  const isCartEmpty = totalItems === 0;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative shrink-0 no-underline hover:no-underline"
    >
      <Link
        href={PAGE_ROUTES.CART}
        aria-label={
          isCartEmpty ? t("CART") : t("CART_ARIA", { count: totalItems })
        }
      >
        <ShoppingBag className="size-5" aria-hidden />
        {!isCartEmpty && (
          <span
            className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums"
            aria-hidden
          >
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
};
