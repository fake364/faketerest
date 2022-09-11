module.exports = {
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['main-page'],
    'rgx:/settings/.*': ['settings']
  }
};
