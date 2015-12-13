'use strict';

describe('Directive: bubbleScatter', function () {

  // load the directive's module
  beforeEach(module('pollutionNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bubble-scatter></bubble-scatter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bubbleScatter directive');
  }));
});
