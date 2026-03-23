import { Main } from "@/components/Main";
import { ProductDetailTemplate } from "@/templates/ProductDetail.template";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = async (props: ProductDetailsPageProps) => {
  const params = await props.params;
  const { slug } = params;

  return (
    <Main>
      <ProductDetailTemplate pid={slug} />
    </Main>
  );
};

export default ProductDetailsPage;
