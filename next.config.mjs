/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}

export default nextConfig
