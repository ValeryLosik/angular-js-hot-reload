export const hello = {
  template: require('./hello.html'),
  controller() {
    this.hello = 'Hello World!!';
  },
  onClick(){
    alert(1);
  }
};

export const helloMobile = {
  template: require('./hello.html'),
  controller() {
    this.hello = 'Hello Mobile World!';
  }
};
