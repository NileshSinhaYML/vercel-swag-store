import { env } from "@/env";
import { routing } from "@/i18n/routing";

const DEV_DEFAULT_PORT = "3001";

export const getSiteOrigin = (): URL => {
  if (env.SITE_URL) {
    return new URL(env.SITE_URL);
  }
  if (env.VERCEL_URL) {
    return new URL(`https://${env.VERCEL_URL}`);
  }
  const port = process.env.PORT ?? DEV_DEFAULT_PORT;
  return new URL(`http://localhost:${port}`);
};

export const getLocalizedPathname = (
  locale: string,
  pathname: string,
): string => {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const useLocalePrefix =
    routing.localePrefix !== "as-needed" || locale !== routing.defaultLocale;
  if (!useLocalePrefix) {
    return normalized;
  }
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
};

export const getAbsoluteSiteUrl = (
  locale: string,
  pathname: string,
): string => {
  const path = getLocalizedPathname(locale, pathname);
  return new URL(path, getSiteOrigin()).toString();
};
