'use strict';

describe('Service: err', function () {

  // load the service's module
  beforeEach(module('pollutionNgApp'));

  // instantiate service
  var err;
  beforeEach(inject(function (_err_) {
    err = _err_;
  }));

  it('should do something', function () {
    expect(!!err).toBe(true);
  });

});
