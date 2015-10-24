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
 		url: local  		
 	};

  	// var forecast = $http(options);

  	// $scope.until = 'Rubbing crystal balls ...'

  	// forecast.then(function(vals) {  		
  	// 	$scope.predictions = vals.data.predictions;
  	// 	console.log(vals.data.predictions);
  	// 	localStorage.setItem('polvals', JSON.stringify(vals.data.predictions));  		
  	// })

	$scope.predictions = JSON.parse(localStorage.getItem('polvals'));
	console.log($scope.predictions)

	var data = [];

	for(var i = 0; i < $scope.predictions.length; i++) {
		data[i] = {x:i, pollution:$scope.predictions[i].p}
	}

	
	$scope.data = data

	console.log($scope.data)

	$scope.options = {
		axes: {
			x : {key: "x"},
			y: {type:'linear'}
		},
		series: [
			{y: 'pollution', color: "#d62728", thickness: "4px"}
		],
		drawDots: true	
	}

  	// $scope.predPromise = {'o':forecast};


  





  }]);
