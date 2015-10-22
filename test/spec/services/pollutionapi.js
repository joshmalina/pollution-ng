'use strict';

describe('Service: pollutionAPI', function () {

  // load the service's module
  beforeEach(module('pollutionNgApp'));

  // instantiate service
  var pollutionAPI;
  beforeEach(inject(function (_pollutionAPI_) {
    pollutionAPI = _pollutionAPI_;
  }));

  it('should do something', function () {
    expect(!!pollutionAPI).toBe(true);
  });

});
