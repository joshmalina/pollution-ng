'use strict';

/**
 * @ngdoc function
 * @name pollutionNgApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the pollutionNgApp
 */
angular.module('pollutionNgApp')
.controller('HeaderCtrl', function ($scope, $location) { 
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };
  });