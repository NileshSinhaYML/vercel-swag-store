import type { FC } from "react";
import { PrimaryNav } from "./PrimaryNav";
import { fetchPromoCode } from "./Navigation.actions";
import { PromoBanner } from "./PromoBanner";

export const Navigation: FC = async () => {
  const promoCode = await fetchPromoCode();
  return (
    <nav className="sticky top-0 right-0 left-0 z-10 bg-white/80 backdrop-blur-sm">
      <PrimaryNav />
      {promoCode && <PromoBanner promoCode={promoCode.data} />}
    </nav>
  );
};
