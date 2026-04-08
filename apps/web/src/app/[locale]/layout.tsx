import type { Metadata } from "next";
import { Suspense } from "react";
import type { FC, ReactNode } from "react";
import { geist } from "@/app/[locale]/font";

import "@ui/styles/global.css";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { LocaleLayoutContent } from "@/layouts/LocaleLayoutContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SITE_METADATA");
  return {
    title: {
      template: t("META_TITLE"),
      default: t("DEFAULT_META_TITLE"),
    },
    description: t("DESCRIPTION"),
  };
}

export interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

const LocaleLayout: FC<Readonly<LocaleLayoutProps>> = (props) => (
  <html lang={routing.defaultLocale}>
    <body className={geist.className}>
      <Suspense fallback={null}>
        <LocaleLayoutContent {...props} />
      </Suspense>
    </body>
  </html>
);

export default LocaleLayout;
