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

  	var url = 'http://ec2-52-91-186-157.compute-1.amazonaws.com/forecast'
  	var local = 'http://127.0.0.1:5000/forecast'

  	var options = {
  		method: 'GET',
  		url: url  		
  	};

  	var forecast = $http(options);

  	$scope.until = 'Rubbing crystal balls ...'

  	forecast.then(function(vals) {  		
  		$scope.predictions = vals.data.predictions
  		console.log(vals.data.predictions)
  	})

  	$scope.predPromise = {'o':forecast};

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.options = {
    	axes: {
    		x: {type: 'linear', min:0, max:241},
    		y: {type: 'linear', min: 0, max: 500}//,
    	},
    	series: [
    		{y: 'p'}
  		],
  		lineMode: 'linear'
    }


    
  }]);
