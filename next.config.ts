import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.24', '192.168.18.138'],
  images: {
    remotePatterns: [{ hostname: '**' }],
  },
}

export default nextConfig
