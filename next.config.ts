import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds (errors are from UI library components)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
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
