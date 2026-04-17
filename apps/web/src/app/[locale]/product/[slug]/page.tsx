import { fetchProductDetails } from "@/app/[locale]/product/[slug]/actions";
import { RouteSegmentLoadingFallback } from "@/components/RouteSegmentLoadingFallback";
import { Main } from "@/components/Main";
import { ProductDetailTemplate } from "@/templates/ProductDetail.template";
import { getAbsoluteSiteUrl } from "@/server/site-origin";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { FC } from "react";

interface ProductDetailsPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const openGraphDescriptionFromProductDescription = (
  description: string,
): string => {
  let rest = description;
  let out = "";
  while (rest.length > 0) {
    const open = rest.indexOf("<");
    if (open === -1) {
      out += rest;
      break;
    }
    out += rest.slice(0, open);
    const close = rest.indexOf(">", open + 1);
    if (close === -1) {
      rest = rest.slice(open + 1);
    } else {
      out += " ";
      rest = rest.slice(close + 1);
    }
  }
  const collapsed = out.split(/\s+/u).filter((part) => part.length > 0).join(" ");
  const max = 200;
  return collapsed.length > max
    ? `${collapsed.slice(0, max - 1)}…`
    : collapsed;
};

export const generateMetadata = async (
  props: ProductDetailsPageProps,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;
  const response = await fetchProductDetails(slug);
  if (!response?.data) {
    notFound();
  }
  const product = response.data;
  const title = product.name;
  const description = openGraphDescriptionFromProductDescription(
    product.description,
  );
  const ogImage = product.images[0];
  const pathname = `/product/${product.slug}`;
  const url = getAbsoluteSiteUrl(locale, pathname);
  return {
    title,
    description,
    openGraph: {
      url,
      title,
      description,
      type: "website",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: product.name,
              },
            ],
          }
        : {}),
    },
    ...(ogImage
      ? {
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
          },
        }
      : {}),
  };
};

const ProductDetailsPage: FC<ProductDetailsPageProps> = async (props) => {
  const params = await props.params;
  const { slug } = params;

  return (
    <Suspense fallback={<RouteSegmentLoadingFallback />}>
      <Main>
        <ProductDetailTemplate pid={slug} />
      </Main>
    </Suspense>
  );
};

export default ProductDetailsPage;
