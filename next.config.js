/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
    return [
        {
            source: '/app-ads.txt',
            destination: '/api/ads'
        },
        {
          source: '/.well-known/assetlinks.json',
          destination: '/api/assetlinks'
      }
    ];
},
  nextConfig,
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      }
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
}
