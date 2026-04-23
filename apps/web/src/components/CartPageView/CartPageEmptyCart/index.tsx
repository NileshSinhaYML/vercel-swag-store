import { APP_CONSTANTS } from "@/constants/app.constants";
import { PAGE_ROUTES } from "@/constants/page.routes";
import { Link } from "@/i18n/navigation";
import { Button } from "@ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export const CartPageEmptyCart: FC = () => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.CART);
  return (
    <div
      className={cn(
        "border-border bg-background relative mx-auto w-full max-w-2xl rounded-lg border border-dashed px-8 py-12",
        "animate-in fade-in zoom-in-95 fill-mode-both duration-500",
      )}
    >
      <div className="relative flex flex-col items-center gap-6 sm:gap-7">
        <p className="text-muted-foreground text-center text-sm">
          {t("EMPTY")}
        </p>
        <div
          className="bg-muted text-foreground grid size-20 place-items-center rounded-lg sm:size-24"
          aria-hidden
        >
          <ShoppingCart
            className="size-10 sm:size-11"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-foreground text-center text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {t("EMPTY_HEADLINE")}
        </h2>
        <p className="text-muted-foreground text-center text-sm leading-relaxed text-pretty sm:max-w-md sm:text-base">
          {t("EMPTY_LEAD")}
        </p>
        <div className="mt-1 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            asChild
            className="h-auto gap-2 py-3 text-sm"
            size="default"
            variant="default"
          >
            <Link href={PAGE_ROUTES.SEARCH}>
              <span>{t("EMPTY_CTA_BROWSE")}</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild className="h-auto py-3 text-sm" variant="outline">
            <Link href={PAGE_ROUTES.HOME}>{t("CONTINUE_SHOPPING")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
