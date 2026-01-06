/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gotovpn.win',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
