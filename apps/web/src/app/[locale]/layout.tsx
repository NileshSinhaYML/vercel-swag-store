import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { FC, ReactNode } from "react";
import { geist } from "@/app/[locale]/font";

import { hasLocale, NextIntlClientProvider } from "next-intl";

import { Navigation } from "@/components/Navigation";

import "@ui/styles/global.css";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Spinner } from "@/components/Spinner";

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
      <body className={geist.className}>
        <Suspense fallback={<Spinner />}>
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
