import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/JM-Portfolio",
  assetPrefix: "/JM-Portfolio/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
