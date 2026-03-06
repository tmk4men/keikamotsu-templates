import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/keikamotsu-templates",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
