/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    // Specify the root directory for the source code
    // This tells Next.js to look for pages, components, etc. inside the src directory
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['localhost'],
    },
  };
export default nextConfig;

