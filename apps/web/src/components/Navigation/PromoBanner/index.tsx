import { APP_CONSTANTS } from "@/constants/app.constants";
import type { PromoCodeResponseData } from "@/types/api/promo-code";
import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";

const NO_PROMO_CODE: string = "AUTO";

export const PromoBanner: FC<{ promoCode: PromoCodeResponseData }> = async ({
  promoCode,
}) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: APP_CONSTANTS.NAME_SPACES.NAVIGATION,
  });
  const hasPromoCode = promoCode.code && promoCode.code !== NO_PROMO_CODE;
  return (
    <div className="flex items-center justify-center bg-black px-6 py-3 lg:px-10">
      <p className="text-sm text-white">
        <span>
          {promoCode.title} {promoCode.description}
        </span>
        {hasPromoCode && (
          <span className="ml-2">
            {t("CODE")} <span className="font-bold">{promoCode.code}</span>
          </span>
        )}
      </p>
    </div>
  );
};
