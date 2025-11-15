import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Allow cross-origin requests from React Native development server
  allowedDevOrigins: [
    "http://192.168.2.53:8081", // React Native Metro bundler
    "http://192.168.2.53:19000", // Expo development server
  ],

  turbopack: {
    root: path.resolve(__dirname, ".."),
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
    resolveAlias: {
      "@bridge": "../shared/bridge",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@bridge": path.resolve(__dirname, "../shared/bridge"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  typedRoutes: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
