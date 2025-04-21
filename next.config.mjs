/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Remove the assetPrefix: './' line - this is causing the error with next/font
  images: {
    unoptimized: true, // Required for static export
  },
  // For next/font to work with static export, we need to set basePath instead
  basePath: '',
}

  
  export default nextConfig