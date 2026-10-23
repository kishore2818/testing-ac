import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" to allow runtime API fetching during dev.
  // Add it back only for static deployment builds.

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;