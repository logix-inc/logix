/** @type {import('next').NextConfig} */

const nextConfig = {
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
