export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
};

export type ProductStock = {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

export interface ProductDetailsResponse {
  success: boolean;
  data: ProductDetail;
}

export interface ProductStockResponse {
  success: boolean;
  data: ProductStock;
}
