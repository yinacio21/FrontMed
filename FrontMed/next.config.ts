import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveExtensions: [
      ".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs",
      ".json", ".css", ".scss", ".sass",
    ],
  },
};

export default nextConfig;
