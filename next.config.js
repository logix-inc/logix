/** @type {import('next').NextConfig} */

// const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
	transpilePackages: ['@logi-x/react', '@logi-x/theme'],
	// assetPrefix: isDev ? 'https://localhost:3000' : '',
	// swcMinify: true,
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: process.env.IS_VERCEL_ENV === 'true',
		ignoreBuildErrors: true
	}
};

module.exports = nextConfig;
