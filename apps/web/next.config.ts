import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: "./tsconfig.json",
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
