/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*", 
          destination: "https://cd9392g9-5000.inc1.devtunnels.ms/api/:path*", // Proxy to your backend
        },
      ];
    },
  };
  
  export default nextConfig;
  