const isMobile = 1;
if (isMobile) {
  require.ensure([], require => {
    require('./index.mobile');
  });
} else {
  require.ensure([], require => {
    require('./index.desktop');
  });
}
// require('./index.mobile');
// import './index.mobile';

