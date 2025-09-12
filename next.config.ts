import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  output: "standalone",
  typedRoutes: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
