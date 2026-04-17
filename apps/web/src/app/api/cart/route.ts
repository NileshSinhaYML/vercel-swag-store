import { API_ROUTES } from "@/constants/api.routes";
import type { CartResponse } from "@/types/api/cart";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

const addBodySchema = z.object({
  productId: z.string().min(1).max(128),
  quantity: z.number().int().positive().max(999_999),
});

const forwardCartHeaders = (req: NextRequest) => {
  const token = req.headers.get("x-cart-token");
  if (!token?.trim()) {
    return null;
  }
  return { "x-cart-token": token.trim() } as const;
};

export const GET = async (request: NextRequest) => {
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
    const upstream = await fetch(swagStoreApiUrl(API_ROUTES.CART), {
      headers: {
        ...swagStoreApiAuthHeaders,
        ...headers,
      },
    });
    const body = (await upstream.json()) as Awaited<CartResponse>;
    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, error: { code: "PROXY_ERROR", message: "Cart fetch failed" } },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
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
  const parsed = addBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid add-to-cart payload" },
      },
      { status: 400 },
    );
  }
  try {
    const upstream = await fetch(swagStoreApiUrl(API_ROUTES.CART), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...swagStoreApiAuthHeaders,
        ...headers,
      },
      body: JSON.stringify(parsed.data),
    });
    const body = (await upstream.json()) as Awaited<CartResponse>;
    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { success: false, error: { code: "PROXY_ERROR", message: "Add to cart failed" } },
      { status: 500 },
    );
  }
};
