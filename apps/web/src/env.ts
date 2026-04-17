import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    SWAG_STORE_API_ENDPOINT: z.url(),
    SWAG_STORE_API_TOKEN: z.string(),
    SITE_URL: z.url().optional(),
    VERCEL_URL: z.string().optional(),
  },
  runtimeEnv: {
    SWAG_STORE_API_ENDPOINT: process.env.SWAG_STORE_API_ENDPOINT,
    SWAG_STORE_API_TOKEN: process.env.SWAG_STORE_API_TOKEN,
    SITE_URL: process.env.SITE_URL || undefined,
    VERCEL_URL: process.env.VERCEL_URL || undefined,
  },
});
