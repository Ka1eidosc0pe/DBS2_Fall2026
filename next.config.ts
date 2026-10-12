import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: `next build` emits plain HTML/CSS/JS to /out
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
