import { Main } from "@/components/Main";
import { CartPageView } from "@/components/CartPageView";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { getAbsoluteSiteUrl } from "@/server/site-origin";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async (
  props: CartPageProps,
): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations(APP_CONSTANTS.NAME_SPACES.CART);
  const title = t("META_TITLE");
  const description = t("META_DESCRIPTION");
  return {
    title,
    description,
    openGraph: {
      url: getAbsoluteSiteUrl(locale, "/cart"),
      title,
      description,
      type: "website",
    },
  };
};

const CartPage: FC = () => (
  <Main>
    <CartPageView />
  </Main>
);

export default CartPage;
