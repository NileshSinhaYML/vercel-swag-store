import { API_ROUTES } from "@/constants/api.routes";
import type { CartResponse } from "@/types/api/cart";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

const productIdParamSchema = z.string().regex(/^[\w-]{1,128}$/);

const patchBodySchema = z.object({
  quantity: z.number().int().positive().max(999_999),
});

const forwardCartHeaders = (req: NextRequest) => {
  const token = req.headers.get("x-cart-token");
  if (!token?.trim()) {
    return null;
  }
  return { "x-cart-token": token.trim() } as const;
};

export const PATCH = async (
  request: NextRequest,
  context: { params: Promise<{ productId: string }> },
) => {
  const { productId: rawId } = await context.params;
  const idParsed = productIdParamSchema.safeParse(rawId);
  if (!idParsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid cart line id" },
      },
      { status: 400 },
    );
  }
  const headers = forwardCartHeaders(request);
  if (!headers) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Missing x-cart-token header" },
      },
      { status: 400 },
    );
  }
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid JSON body" },
      },
      { status: 400 },
    );
  }
  const parsed = patchBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid quantity" },
      },
      { status: 400 },
    );
  }
  try {
    const upstream = await fetch(
      swagStoreApiUrl(`${API_ROUTES.CART}/${idParsed.data}`),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...swagStoreApiAuthHeaders,
          ...headers,
        },
        body: JSON.stringify(parsed.data),
      },
    );
    const body = (await upstream.json()) as Awaited<CartResponse>;
    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Error updating cart line:", error);
    return NextResponse.json(
      { success: false, error: { code: "PROXY_ERROR", message: "Cart update failed" } },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  context: { params: Promise<{ productId: string }> },
) => {
  const { productId: rawId } = await context.params;
  const idParsed = productIdParamSchema.safeParse(rawId);
  if (!idParsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid cart line id" },
      },
      { status: 400 },
    );
  }
  const headers = forwardCartHeaders(request);
  if (!headers) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Missing x-cart-token header" },
      },
      { status: 400 },
    );
  }
  try {
    const upstream = await fetch(
      swagStoreApiUrl(`${API_ROUTES.CART}/${idParsed.data}`),
      {
        method: "DELETE",
        headers: {
          ...swagStoreApiAuthHeaders,
          ...headers,
        },
      },
    );
    const body = (await upstream.json()) as Awaited<CartResponse>;
    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Error removing cart line:", error);
    return NextResponse.json(
      { success: false, error: { code: "PROXY_ERROR", message: "Cart remove failed" } },
      { status: 500 },
    );
  }
};
