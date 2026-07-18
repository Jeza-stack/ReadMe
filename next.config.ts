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
      // B1-C2 marketing shells superseded by the CEFR Academy lesson hubs.
      // /level/a1 and /level/a2 keep real lesson content and stay live.
      { source: '/level/b1', destination: '/cefr/b1', permanent: true },
      { source: '/level/b2', destination: '/cefr/b2', permanent: true },
      { source: '/level/c1', destination: '/cefr/c1', permanent: true },
      { source: '/level/c2', destination: '/cefr/c2', permanent: true },
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
