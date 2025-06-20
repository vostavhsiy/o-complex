import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "*" }],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
