// import type { NextConfig } from "next";

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true, // ✅ disables ESLint during `next build`
//   },
//   /* config options here */
// };

// module.exports = withPWA({
//   nextConfig,
// });

// export default nextConfig;

// next.config.js or next.config.mjs

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // other config options (i18n, images, etc.) go here
};

module.exports = withPWA(nextConfig);
