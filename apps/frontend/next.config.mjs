/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL: 'http://localhost:3001',
        GRAPHQL_ADDRESS: 'http://localhost:3001/graphql',
    },
    reactStrictMode: false,
};

export default nextConfig;