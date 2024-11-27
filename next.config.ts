import type { NextConfig } from "next";
import webpack from "webpack";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: isProduction,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        "node:crypto": "crypto-browserify",
        "node:stream": "stream-browserify",
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
