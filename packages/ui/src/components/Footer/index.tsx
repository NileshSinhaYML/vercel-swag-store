import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";

export const Footer: FC = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "FOOTER" });
  return (
    <footer className="h-14 w-full border-t bg-black py-4">
      <p className="px-10 text-sm text-white">
        &copy; {new Date().getFullYear()} {t("COPYRIGHT")}
      </p>
    </footer>
  );
};
