import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable file polling for WSL2 (fixes HMR not detecting changes)
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
