// Copy common webpack config
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var standardWebpackConf = require('./webpack.conf.js');
var webpackConf = Object.assign({}, standardWebpackConf);


// add componentHotLoader and serviceLoader
// (webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
//   { test: /\.component\.js$/, loader: componentHotLoader, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
// );
// (webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
//   { test: /\.service\.js$/, loader: serviceHotLoader, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
// );
// (webpackConf.module.postLoaders = webpackConf.module.postLoaders || []).push(
//   { test: /\.html/, loader: jadeHotLoader }
// );

webpackConf.devtool = 'eval';
webpackConf.entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/dev-server',
  './index.desktop.js'
];
// for css source maps support
webpackConf.output.publicPath = 'http://localhost:8080/static/';
webpackConf.module.loaders.forEach(function(value) {
  value.loader = value.loader.replace('css-loader', 'css-loader?sourceMap');
});

webpackConf.plugins = [
  new webpack.HotModuleReplacementPlugin()
];


new WebpackDevServer(webpack(webpackConf), {
  publicPath: webpackConf.output.publicPath,
  hot: true
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8080');
});

