import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  experimental: {
    middlewareClientMaxBodySize: "100mb",
  },
  output: "standalone",

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors http://localhost:3000 https://autofill.yandex.ru;',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
