/** @type {import('next').NextConfig} */

// Your GitHub repository name — used as the URL base path on GitHub Pages
// e.g. if your site is https://yourusername.github.io/homenest  → set to 'homenest'
// e.g. if your site is https://yourusername.github.io/          → set to ''
const REPO_NAME = process.env.REPO_NAME || 'homenest'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // Static export — required for GitHub Pages
  output: 'export',

  // Base path and asset prefix for GitHub Pages subpath
  // These are only applied in production build; local dev uses '/'
  basePath: isProd && REPO_NAME ? `/${REPO_NAME}` : '',
  assetPrefix: isProd && REPO_NAME ? `/${REPO_NAME}/` : '',

  // Required for static export — disables server-side image optimization
  images: {
    unoptimized: true,
  },

  // Trailing slash ensures index.html is created for each route
  trailingSlash: true,
}

module.exports = nextConfig
