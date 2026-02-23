/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL('https://lh3.googleusercontent.com/**')
    ]
  }
};

export default nextConfig;
