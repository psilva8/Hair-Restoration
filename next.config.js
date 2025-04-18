/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  // Set the output to 'export' for static site generation compatible with Cloudflare Pages
  output: 'export',
  // Add trailing slashes for better compatibility with static hosting
  trailingSlash: true,
  // Disable image optimization since Cloudflare Pages doesn't support it in static exports
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Server-side packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    config.devtool = false;
    return config;
  },
};

module.exports = nextConfig; 