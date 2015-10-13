'use strict';

/**
 * @ngdoc function
 * @name pollutionNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pollutionNgApp
 */
angular.module('pollutionNgApp')
  .controller('MainCtrl', ['$http', '$scope', function ($http, $scope) {

  	var options = {
  		method: 'GET',
  		url: 'http://127.0.0.1:5000/forecast'  		
  	};

  	var forecast = $http(options);

  	$scope.until = 'Rubbing crystal balls ...'

  	forecast.then(function(vals) {  		
  		$scope.predictions = vals.data.predictions
  		console.log(vals.data.predictions)
  	})

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    
  }]);
