/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Enable App Router (already used in your app/ directory)
  },
};

export default nextConfig;