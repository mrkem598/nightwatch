var MockServer  = require('mockserver');
module.exports = {
  setUp: function (callback) {
    this.client = require('../../nightwatch.js').init();

    callback();
  },

  testTouchClickCommand : function(test) {
    var client = this.client.api;

    MockServer.addMock({
      'url' : '/wd/hub/session/1352110219202/element/0/touch/click',
      'response' : JSON.stringify({
        sessionId: '1352110219202',
        status:0
      })
    });

    client.touchClick('#weblogin', function callback(result) {
      test.equals(result.status, 0);
    }).touchClick('css selector', '#weblogin', function callback(result) {
      test.equals(result.status, 0);
      test.done();
    });
  },

  testClickCommandWithXpath : function(test) {
    var client = this.client.api;

    MockServer.addMock({
      'url' : '/wd/hub/session/1352110219202/element/0/touch/click',
      'response' : JSON.stringify({
        sessionId: '1352110219202',
        status:0
      })
    });

    client
      .useXpath()
      .touchClick('//weblogin', function callback(result) {
        test.equals(result.status, 0);
      })
      .touchClick('css selector', '#weblogin', function callback(result) {
        test.equals(result.status, 0);
        test.done();
      });
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
};
