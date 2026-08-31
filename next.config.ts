import type { NextConfig } from "next";

const allowedDevOrigins = [
  "127.0.0.1",
  "localhost",
  "192.168.67.186",
  "172.17.35.161",
  ...(process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? []),
];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/super-admin",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/super-admin",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/super-admin/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/Admin", destination: "/super-admin" },
      { source: "/Admin/:path*", destination: "/super-admin/:path*" },
    ];
  },
};

export default nextConfig;
