const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');
const webpackConf = require('../conf/webpack.conf');
const webpackDistConf = require('../conf/webpack-dist.conf');
const webpackDevConf = require('../conf/webpack-dev.conf');
const gulpConf = require('../conf/gulp.conf');
const browsersync = require('browser-sync');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

gulp.task('webpack:dev', done => {
  webpackWrapper(false, webpackConf, done);
});

gulp.task('webpack:watch', done => {
  webpackWrapper(true, webpackConf, done);
});

gulp.task('webpack:dist', done => {
  process.env.NODE_ENV = 'production';
  webpackWrapper(false, webpackDistConf, done);
});


gulp.task('webpack:dev-server', () => {
  console.log(webpackDevConf);
  new WebpackDevServer(
    webpack(webpackDevConf), {
      publicPath: webpackDevConf.output.publicPath,
      hot: true,
      historyApiFallback: true
    }).listen(gulpConf.port, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", `http://localhost:${gulpConf.port}/webpack-dev-server/index.html`);
  });
});

function webpackWrapper(watch, conf, done) {
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gulpConf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));
    if (done) {
      done();
      done = null;
    } else {
      browsersync.reload();
    }
  };

  if (watch) {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}
