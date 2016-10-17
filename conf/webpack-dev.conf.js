const conf = require('./gulp.conf');
const standardWebpackConf = require('./webpack.conf.js');
const clone = require('clone');
const webpackConf = clone(standardWebpackConf);
const webpack = require('webpack');
const componentHotLoader = require.resolve('./../loaders/component-loader');
const serviceHotLoader = require.resolve('./../loaders/service-loader');
const htmlHotLoader = require.resolve('./../loaders/html-loader');

webpackConf.entry = [
  `webpack-dev-server/client?http://localhost:${conf.port}`,
  'webpack/hot/dev-server',
  standardWebpackConf.entry
];
webpackConf.devtool = 'eval';
// add componentHotLoader and serviceLoader
(webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
  { test: /\.component\.js$/, loader: componentHotLoader, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
);
(webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
  { test: /\.service\.js$/, loader: serviceHotLoader, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
);

(webpackConf.module.postLoaders = webpackConf.module.postLoaders || []).push(
  {test: /\.html/, exclude: [/index\.html/],loader: htmlHotLoader}
);

// for css source maps support
webpackConf.output.publicPath = `http://localhost:${conf.port}/`;
// webpackConf.module.loaders.forEach(function (value) {
//   value.loader = value.loader.replace('css-loader', 'css-loader?sourceMap');
// });

webpackConf.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = webpackConf;
