import { API_ROUTES } from "@/constants/api.routes";
import { APP_CONSTANTS } from "@/constants/app.constants";
import type { CartPayload } from "@/types/api/cart";
import type {
  ProductStock,
  ProductStockResponse,
} from "@/types/api/product-details";

export const getCartPageProductStockUrl = (slug: string): string =>
  `${API_ROUTES.PRODUCTS_PROXY}/${encodeURIComponent(slug)}/stock`;

export const productStockFromStockApiResponse = (
  res: Response,
  productStockResponse: ProductStockResponse,
): ProductStock | null => {
  if (!res.ok || !productStockResponse.success || !productStockResponse.data)
    return null;
  return productStockResponse.data;
};

export const sortedUniqueCartProductSlugs = (
  items: readonly { product: { slug: string } }[] | undefined,
): string[] => {
  if (!items?.length) return [];
  return [...new Set(items.map((line) => line.product.slug))].toSorted((a, b) =>
    a.localeCompare(b),
  );
};

export const cartLineMaxQuantity = (
  stock: ProductStock | null | undefined,
  lineQuantity: number,
): number | undefined => {
  if (stock === undefined) return undefined;
  if (stock === null) return lineQuantity;
  if (!stock.inStock) return 0;
  return Math.max(0, stock.stock);
};

export const cartLineMinusDisabled = (
  busyRow: boolean,
  lineQuantity: number,
): boolean => busyRow || lineQuantity <= 1;

export const cartLinePlusDisabled = (
  busyRow: boolean,
  lineQuantity: number,
  maxStock: number | undefined,
): boolean =>
  busyRow ||
  maxStock === undefined ||
  maxStock <= 0 ||
  lineQuantity >= maxStock;

export const decrementedLineQuantity = (lineQuantity: number): number =>
  lineQuantity <= 1 ? 0 : lineQuantity - 1;

export const estimatedTaxFromSubtotal = (
  subtotal: number,
  taxRate: number,
): number => Math.round(subtotal * taxRate * 100) / 100;

export const getCartOrderTotals = (
  cart: CartPayload | null,
): {
  estimatedTax: number;
  orderTotal: number;
} => {
  if (cart === null) {
    return { estimatedTax: 0, orderTotal: 0 };
  }
  const estimatedTax = estimatedTaxFromSubtotal(
    cart.subtotal,
    APP_CONSTANTS.CART_SUMMARY_ESTIMATED_TAX_RATE,
  );
  return { estimatedTax, orderTotal: cart.subtotal + estimatedTax };
};
