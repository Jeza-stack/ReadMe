import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    // Old course-shaped sections superseded by the dedicated hubs.
    return [
      { source: '/courses/cefr-english', destination: '/cefr', permanent: true },
      { source: '/courses/ai-tools', destination: '/ai-for-students', permanent: true },
      { source: '/courses/ai-tools/:path*', destination: '/ai-for-students', permanent: true },
      { source: '/courses/chat-gpt-safety', destination: '/ai-for-students', permanent: true },
      { source: '/courses/chat-gpt-safety/:path*', destination: '/ai-for-students', permanent: true },
      { source: '/courses/academic-language', destination: '/academic-success', permanent: true },
      { source: '/courses/academic-language/:path*', destination: '/academic-success', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
