export type Category = {
  slug: string;
  name: string;
  productCount: number;
};

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}
