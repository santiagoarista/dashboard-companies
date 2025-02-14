/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [{ module: /node_modules\/node-fetch/ }];
    return config;
  },
}

module.exports = nextConfig 