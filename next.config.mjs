/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'standalone' is for Docker self-hosting only. Remove when deploying to Vercel.
  ...(process.env.DOCKER_BUILD === 'true' ? { output: 'standalone' } : {}),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
