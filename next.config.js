/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextlevelfood.storage.iran.liara.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
