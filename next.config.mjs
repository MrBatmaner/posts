/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "joker-uploads.s3.ap-southeast-2.amazonaws.com",
      "avatars.dicebear.com",
    ],
  },
};

export default nextConfig;
