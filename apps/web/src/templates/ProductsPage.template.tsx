import { getAllCategories } from "@/app/[locale]/products/actions";
import type { FC } from "react";

export const ProductsPageTemplate: FC = async () => {
  const categoriesResponse = await getAllCategories();

  return (
    <div className="col-span-full flex flex-col gap-y-4 lg:gap-y-8">
      {categoriesResponse?.data.map((category) => (
        <div key={category.slug} className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-semibold">{category.name}</h2>
          <p className="text-sm text-gray-500">{category.slug}</p>
        </div>
      ))}
    </div>
  );
};
