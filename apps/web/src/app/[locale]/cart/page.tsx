import { Main } from "@/components/Main";
import { CartPageView } from "@/components/CartPageView";
import { APP_CONSTANTS } from "@/constants/app.constants";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(APP_CONSTANTS.NAME_SPACES.CART);
  return { title: t("META_TITLE") };
}

const CartPage: FC = () => (
  <Main>
    <CartPageView />
  </Main>
);

export default CartPage;
