class HelloController {
  constructor() {
    this.hello = 'Hello world!!';
    this.counter = 0;
  }

  onClick() {
    this.counter -= 5;
  }

}

export default {
  template: require('./hello.html'),
  controller: HelloController
};
