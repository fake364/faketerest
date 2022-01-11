const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});
const { i18n } = require('./next-i18next.config');

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	i18n
});
