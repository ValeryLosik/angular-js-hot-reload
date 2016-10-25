import angular from 'angular';
import UAParser from 'ua-parser-js';

const bootstrap = app => angular.bootstrap(document.body, [app]);// eslint-disable-line angular/document-service

const parser = new UAParser();
const {type} = parser.getDevice();
const isTablet = type => type === 'tablet';
const isMobile = type => type === 'mobile';

if (isMobile(type) || isTablet(type)) {
  require.ensure([], require => {
    bootstrap(require('./index.mobile').default);
  });
} else {
  require.ensure([], require => {
    bootstrap(require('./index.desktop').default);
  });
}
