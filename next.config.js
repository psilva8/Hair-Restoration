/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
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