const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // 'storybook-addon-next',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
    // '@storybook/addon-a11y',
  ],

  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  // webpackFinal: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve?.alias,
  //     '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
  //   };
  //   config.resolve.roots = [
  //     path.resolve(__dirname, '../public'),
  //     'node_modules',
  //   ];
  //   return config;
  // },
  // webpackFinal: async (config) => {
  //   return {
  //     ...config,
  //     config.resolve.modules = [
  //       ...(config.resolve.modules || []),
  //       path.resolve('../')
  //     ]

  //   };
  // },
  // webpackFinal: async (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '~/': path.resolve(__dirname, '../src/'),
  //   };
  //   config.resolve.extensions.push('.ts', '.tsx');
  //   return config;
  // },
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    //   include: path.resolve(__dirname, '../'),
    // });
    // config.resolve.alias['next/image'] = require.resolve('./NextImage.js');

    // Return the altered config
    return config;
  },
};
