/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // Supabase Storage (all projects on supabase.co)
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        // Supabase Storage (custom domains via supabase.in)
        protocol: 'https',
        hostname: '*.supabase.in',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.somafix.com.tr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gypsumceilingkenya.co.ke',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bewama.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'bewama.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.bewama.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '*.bewama.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
