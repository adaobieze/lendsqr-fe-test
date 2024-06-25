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
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['next/babel']],
            plugins: [['styled-jsx/babel', { optimizeForSpeed: true }]],
          },
        },
      }
    );

    return config;
  },
};
