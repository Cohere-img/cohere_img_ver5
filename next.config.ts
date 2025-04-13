import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
        MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
