export type Product = {
  category: string;
  createdAt: string;
  currency: string;
  description: string;
  featured: boolean;
  id: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  tags: string[];
};

export type PaginationResponse = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type ProductsResponseMeta = {
  pagination: PaginationResponse;
};

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  meta: ProductsResponseMeta;
}
