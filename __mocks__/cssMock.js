// __mocks__/cssMock.js
const target = {};

const handler = {
  get: function (target, prop) {
    return prop;
  },
};

const proxy = new Proxy(target, handler);

export default proxy;
