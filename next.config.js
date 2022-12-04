/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: {
    source: "/",
    destination: "/about",
    permanent: true,
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/employee/list',
        permanent: true,
      },
    ]
  },
}
