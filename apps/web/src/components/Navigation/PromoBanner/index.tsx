import type { PromoCodeResponseData } from "@/types/api/promo-code-response";
import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";

export const PromoBanner: FC<{ promoCode: PromoCodeResponseData }> = async ({
  promoCode,
}) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "NAVIGATION",
  });
  return (
    <div className="flex items-center justify-center bg-black px-6 py-3 lg:px-10">
      <p className="text-sm text-white">
        <span>
          {promoCode.title} {promoCode.description}
        </span>
        {!!promoCode.code && (
          <span className="ml-2">
            {t("CODE")} <span className="font-bold">{promoCode.code}</span>
          </span>
        )}
      </p>
    </div>
  );
};
