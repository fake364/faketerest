module.exports = {
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['main-page', 'error-messages'],
    '/fake-builder': ['error-messages'],
    'rgx:/.*': ['profile'],
    'rgx:/settings/.*': ['settings'],
    '/signup': ['error-messages', 'main-page'],
    '/login': ['error-messages', 'main-page'],
    '/settings': ['settings'],

  }
};
