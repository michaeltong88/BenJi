module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          containers: './src/containers',
          components: './src/components',
          utils: './src/utils',
          globals: './src/globals',
          hooks: './src/hooks',
          stores: './src/stores',
          types: './src/types',
        },
      },
    ],
  ],
};
