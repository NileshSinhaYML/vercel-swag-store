import createMiddleware from "next-intl/middleware";
import { routing } from "@ui/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
