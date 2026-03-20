import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const messageModule = (await import(
    `../../messages/${locale}.json`
  )) as Promise<unknown>;
  const messages = (
    messageModule as unknown as { default: Record<string, unknown> }
  ).default;

  return {
    locale,
    messages,
  };
});
