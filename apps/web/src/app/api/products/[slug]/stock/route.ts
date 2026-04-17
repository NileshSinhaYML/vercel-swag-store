import { API_ROUTES } from "@/constants/api.routes";
import type { ProductStockResponse } from "@/types/api/product-details";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const slugParamSchema = z.string().regex(/^[\w-]{1,256}$/);

export const GET = async (
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) => {
  const { slug: rawSlug } = await context.params;
  const parsed = slugParamSchema.safeParse(rawSlug);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "BAD_REQUEST", message: "Invalid product slug" } },
      { status: 400 },
    );
  }
  const slug = parsed.data;
  try {
    const upstream = await fetch(
      swagStoreApiUrl(`${API_ROUTES.PRODUCTS}/${encodeURIComponent(slug)}/stock`),
      { headers: { ...swagStoreApiAuthHeaders } },
    );
    const body = (await upstream.json()) as Awaited<ProductStockResponse>;
    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Error fetching product stock:", error);
    return NextResponse.json(
      { success: false, error: { code: "PROXY_ERROR", message: "Stock fetch failed" } },
      { status: 500 },
    );
  }
};
