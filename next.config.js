/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.cloudinary.com', 'res.cloudinary.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CDN_USERNAME: process.env.CDN_USERNAME,
  },
};

module.exports = nextConfig;
