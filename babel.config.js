module.exports = {
  presets: ['@babel/react', '@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]
};
