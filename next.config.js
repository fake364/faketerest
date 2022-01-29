const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});
const withPWA = require('next-pwa');

const { i18n } = require('./next-i18next.config');

module.exports = withBundleAnalyzer(
	withPWA({
		reactStrictMode: true,
		i18n,
		pwa: {
			dest: 'public'
		}
	})
);
