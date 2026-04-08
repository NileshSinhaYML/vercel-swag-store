import { RouteSegmentLoadingFallback } from "@/components/RouteSegmentLoadingFallback";
import { Main } from "@/components/Main";
import { ProductDetailTemplate } from "@/templates/ProductDetail.template";
import { Suspense } from "react";
import type { FC } from "react";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

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
