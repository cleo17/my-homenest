/** @type {import('next').NextConfig} */

const nextConfig = {
  // REQUIRED for Netlify / static hosting
  output: "export",

  // REQUIRED for static export (fixes images issues)
  images: {
    unoptimized: true,
  },

  // IMPORTANT: ensures every route becomes real HTML file
  trailingSlash: true,
}

module.exports = nextConfig
