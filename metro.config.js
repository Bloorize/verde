const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
const { resolve } = require('metro-resolver');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const fromEChartsStack =
    context.originModulePath.includes('/node_modules/zrender/') ||
    context.originModulePath.includes('/node_modules/echarts/');

  if (moduleName === 'tslib' && fromEChartsStack) {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'src/shims/tslib-zrender.js'),
    };
  }

  return resolve(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
