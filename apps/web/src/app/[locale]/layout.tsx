import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { FC, ReactNode } from "react";
import { inter } from "@/app/[locale]/font";

import { hasLocale, NextIntlClientProvider } from "next-intl";

import { Navigation } from "@ui/components/Navigation";

import "@ui/styles/global.css";
import { Footer } from "@ui/components/Footer";
import { routing } from "@ui/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

const LocaleLayout: FC<Readonly<LocaleLayoutProps>> = async ({
  children,
  params,
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <NextIntlClientProvider locale={locale}>
            <Navigation />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default LocaleLayout;
