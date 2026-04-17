import { API_ROUTES } from "@/constants/api.routes";
import type { CartResponse } from "@/types/api/cart";
import {
  swagStoreApiAuthHeaders,
  swagStoreApiUrl,
} from "@/server/swag-store-api.fetch";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const upstream = await fetch(swagStoreApiUrl(API_ROUTES.CART_CREATE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...swagStoreApiAuthHeaders,
      },
      body: "{}",
    });
    const body = (await upstream.json()) as Awaited<CartResponse>;
    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Error creating cart:", error);
    return NextResponse.json(
      { success: false, error: { code: "PROXY_ERROR", message: "Cart create failed" } },
      { status: 500 },
    );
  }
};
