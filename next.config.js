/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  env: {
    FOURSQUERE_AUTH: process.env.FOURSQUERE_AUTH,
    UNSPLASH_SECRET: process.env.UNSPLASH_SECRET,
    UNSPLASH_KEY: process.env.UNSPLASH_KEY,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_KEY: process.env.AIRTABLE_BASE_KEY
  }
}

module.exports = nextConfig
