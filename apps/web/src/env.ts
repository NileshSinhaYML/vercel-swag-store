import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    SWAG_STORE_API_ENDPOINT: z.url(),
    SWAG_STORE_API_TOKEN: z.string(),
  },
  runtimeEnv: {
    SWAG_STORE_API_ENDPOINT: process.env.SWAG_STORE_API_ENDPOINT,
    SWAG_STORE_API_TOKEN: process.env.SWAG_STORE_API_TOKEN,
  },
});
