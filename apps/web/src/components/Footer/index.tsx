import { APP_CONSTANTS } from "@/constants/app.constants";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import type { FC } from "react";
import { cn } from "@repo/ui/lib/utils";
import { FooterFallback } from "@/components/Footer/FooterFallback";
import { Suspense } from "react";

export interface FooterProps {
  className?: string;
}
export const Footer: FC<FooterProps> = async ({ className }) => {
  await headers();
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: APP_CONSTANTS.NAME_SPACES.FOOTER,
  });
  return (
    <Suspense fallback={<FooterFallback />}>
      <footer className={cn("h-14 w-full border-t bg-black py-4", className)}>
        <p className="px-6 text-sm text-white lg:px-10">
          &copy; {new Date().getFullYear()} {t("COPYRIGHT")}
        </p>
      </footer>
    </Suspense>
  );
};
