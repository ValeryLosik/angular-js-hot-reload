export const hello = {
  template: require('./hello.html'),
  controller() {
    this.hello = 'Hello World!!';
  }
};

export const helloMobile = {
  template: require('./hello.html'),
  controller() {
    this.hello = 'Hello Mobile World!';
  }
};
