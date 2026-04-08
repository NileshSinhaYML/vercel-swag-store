import { fetchPromoCode } from "@/components/Navigation/navigation.actions";
import { PromoBanner } from "@/components/Navigation/PromoBanner";
import type { FC } from "react";

export const NavigationPromo: FC = async () => {
  const promoResponse = await fetchPromoCode();
  if (!promoResponse?.data) return null;
  return <PromoBanner promoCode={promoResponse.data} />;
};
