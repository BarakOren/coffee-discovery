/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  env: {
    FOURSQUERE_AUTH: process.env.NEXT_PUBLIC_FOURSQUERE_AUTH,
    UNSPLASH_SECRET: process.env.NEXT_PUBLIC_UNSPLASH_SECRET,
    UNSPLASH_KEY: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
    AIRTABLE_API_KEY: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    AIRTABLE_BASE_KEY: process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY
  }
}

module.exports = nextConfig
