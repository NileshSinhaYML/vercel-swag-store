export const isNextPrerenderBailout = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "digest" in error &&
  (error as { digest: string }).digest === "NEXT_PRERENDER_INTERRUPTED";
