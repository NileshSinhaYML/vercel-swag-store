import { postcssConfig } from "@repo/tailwind-config/postcss";

postcssConfig.content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
];

const config = postcssConfig;

export default config;
