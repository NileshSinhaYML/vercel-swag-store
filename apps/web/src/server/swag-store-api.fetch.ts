import { env } from "@/env";

export const swagStoreApiAuthHeaders = {
  "x-vercel-protection-bypass": env.SWAG_STORE_API_TOKEN,
} as const;

export const swagStoreApiUrl = (route: string): string =>
  `${env.SWAG_STORE_API_ENDPOINT}${route}`;
