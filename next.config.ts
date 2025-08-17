/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://192.168.65.128:3000/api/:path*' }];
  },
};
module.exports = nextConfig;