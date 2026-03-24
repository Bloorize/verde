module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const isTest = process.env.NODE_ENV === 'test';

  const presets = ['babel-preset-expo', 'nativewind/babel'];
  const plugins = [];
  if (!isTest) {
    plugins.push('react-native-reanimated/plugin');
  }

  return {
    presets,
    plugins,
  };
};
