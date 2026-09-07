import type { NextConfig } from "next";

const NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvvbxrs55/image/upload/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "storage.googleapis.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export default NextConfig;
