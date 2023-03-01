const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const { i18n } = require('./i18n');
const nextTranslate = require('next-translate');
module.exports = nextTranslate(
  withBundleAnalyzer({
    reactStrictMode: true,
    i18n,
    pwa: {
      dest: 'public'
    },
    images: {
      deviceSizes: [400, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    }
  })
);
