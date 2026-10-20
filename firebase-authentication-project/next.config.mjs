/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   experimental: {
//     agentFeedback: true,
//   },
//   cacheComponents: true,
//   partialPrefetching: true,
//   reactCompiler: true,
//   turbopack: {
//     rules: {
//         loaders: ["@tailwindcss/turbopack"],
//       },
//   },
// };
// // Note: Ensure these experimental flags match the exact naming of your Next.js version
// // (e.g., ppr: true for partial prefetching, reactCompiler: true)

// // Removing the restrictive Turbopack rule allows Next.js to use its 
// // built-in parser for standard CSS and CSS Modules natively.

// export default nextConfig;

