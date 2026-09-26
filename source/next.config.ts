import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const customDomain = process.env.CUSTOM_DOMAIN === "true";
const basePath = githubPages && !customDomain ? "/thevalley-beauty.com" : "";

const nextConfig: NextConfig = {
  // Static export for both the root custom domain and the GitHub Pages
  // project sub-path. Next.js then generates matching client-router URLs.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
