import type { LocaleLayoutProps } from "@/app/[locale]/layout";
import type { FC } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const LocaleLayoutContent: FC<Readonly<LocaleLayoutProps>> = async ({
  children,
  params,
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return (
    <NextIntlClientProvider locale={locale}>
      <Navigation />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
};
