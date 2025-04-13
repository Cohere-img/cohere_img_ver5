import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
};

export default nextConfig;
module.exports = {
    env: {
        SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
        API_KEY: process.env.API_KEY,
    },
};

// next.config.js
module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
};
