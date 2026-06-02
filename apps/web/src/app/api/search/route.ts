import { fetchSearchProducts } from "@/app/[locale]/search/actions";
import { isNextPrerenderBailout } from "@/utils/api.utils";
import type { SearchQueryParams } from "@/types/components/search.types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = Number.parseInt(searchParams.get("page") ?? "1", 10);
    const limitParam = Number.parseInt(searchParams.get("limit") ?? "12", 10);
    const queryParams: SearchQueryParams = {
      search: (searchParams.get("search") ?? "").trim(),
      category: (searchParams.get("category") ?? "").trim(),
      page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
      limit:
        Number.isFinite(limitParam) && limitParam > 0
          ? Math.min(100, limitParam)
          : 12,
    };
    const products = await fetchSearchProducts(queryParams);
    if (!products) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch products" },
        { status: 502 },
      );
    }
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
