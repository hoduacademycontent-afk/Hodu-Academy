import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/enroll',
        destination: 'https://portal.hoduacademy.com/hodu-academy/learner-login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
