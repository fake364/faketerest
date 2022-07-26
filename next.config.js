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
    },
    images: {
      deviceSizes: [400, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    }
  })
);
