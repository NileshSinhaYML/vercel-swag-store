import { API_ROUTES } from "@/constants/api.routes";
import { env } from "@/env";
import type { ProductsResponse } from "@/types/api/products";
import { isNextPrerenderBailout } from "@/utils/api.utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const upstream = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      upstream.append(key, value);
    }

    const productsResponse = await fetch(
      `${env.SWAG_STORE_API_ENDPOINT}${API_ROUTES.PRODUCTS}?${upstream.toString()}`,
      {
        headers: {
          "x-vercel-protection-bypass": env.SWAG_STORE_API_TOKEN,
        },
      },
    );

    const products =
      (await productsResponse.json()) as Awaited<ProductsResponse>;
    return NextResponse.json(products);
  } catch (error) {
    if (isNextPrerenderBailout(error)) {
      throw error;
    }
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
};
