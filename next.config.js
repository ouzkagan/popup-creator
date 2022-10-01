/** @type {import('next').NextConfig} */
const nextConfig = {
  domains: ['localhost', 'api.cloudinary.com'],
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CDN_USERNAME: process.env.CDN_USERNAME,
  },
};

module.exports = nextConfig;
