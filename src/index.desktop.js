import angular from 'angular';

import HelloComponent from './app/hello.component';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.less';

export const app = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('hello', HelloComponent);
