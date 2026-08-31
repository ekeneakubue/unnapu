import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.67.186", "127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/admin",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    // Serve the lowercase /admin app for /Admin URLs without a redirect loop
    // (Windows treats path casing as equal in redirects).
    return [
      { source: "/Admin", destination: "/admin" },
      { source: "/Admin/:path*", destination: "/admin/:path*" },
    ];
  },
};

export default nextConfig;
