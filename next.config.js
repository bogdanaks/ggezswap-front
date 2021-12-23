/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  baseUrl: '.',
  pageExtensions: ['p.tsx'],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    domains: ['steamcdn-a.akamaihd.net', 'steamcommunity-a.akamaihd.net'],
  },
  async headers () {
    return [
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000',
          },
        ],
      },
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000',
          },
        ],
      },
      {
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000',
          },
        ],
      },
    ]
  },
};
