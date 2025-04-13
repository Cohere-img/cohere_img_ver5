import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
        API_KEY: process.env.API_KEY,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
