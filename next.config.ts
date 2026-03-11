import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  experimental: {
    middlewareClientMaxBodySize: "100mb"
  },
  output: "standalone"
};

export default nextConfig;
