const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
