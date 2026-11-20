import type { NextConfig } from "next";

const backendUrl =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 100],
    minimumCacheTTL: 31536000, // 1 year image caching
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'birlaheritagesiwan.com',
      },
      {
        protocol: 'https',
        hostname: 'www.birlaheritagesiwan.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Cache static Next.js assets (_next/static) immutably for 1 year
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache static images, fonts, icons, media in public/
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400', // 30 days + 1 day stale-while-revalidate
          },
        ],
      },
      {
        // Cache uploaded files from uploads proxy
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
