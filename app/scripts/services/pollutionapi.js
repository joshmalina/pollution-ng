'use strict';

/**
 * @ngdoc service
 * @name pollutionNgApp.pollutionAPI
 * @description
 * # pollutionAPI
 * Factory in the pollutionNgApp.
 */
angular.module('pollutionNgApp')
  .factory('pollutionAPI', ['$http', function ($http) {
    
    var options = {
      method: 'GET',
      url: 'http://127.0.0.1:5000/forecast'     
    };

    return $http(options);

    
  }]);
