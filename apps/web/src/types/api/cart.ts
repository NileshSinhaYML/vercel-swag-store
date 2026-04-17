import type { ProductDetail } from "@/types/api/product-details";

export type CartLineItem = {
  productId: string;
  quantity: number;
  addedAt: string;
  product: ProductDetail;
  lineTotal: number;
};

export type CartPayload = {
  token: string;
  items: CartLineItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export type CartResponse = {
  success: boolean;
  data: CartPayload;
};

export type CartErrorBody = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};
