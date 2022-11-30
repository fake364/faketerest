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
      // remotePatterns: [
      //   {
      //     protocol: 'http',
      //     hostname: 'localhost',
      //     port: '',
      //     pathname: '/static-box/**'
      //   }
      // ],
      deviceSizes: [400, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    },
    env: { PAGER_API_URL: process.env.PAGER_API_URL }
  })
);
