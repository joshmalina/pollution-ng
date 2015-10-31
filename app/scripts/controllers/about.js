'use strict';

/**
 * @ngdoc function
 * @name pollutionNgApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pollutionNgApp
 */
angular.module('pollutionNgApp')
  .controller('AboutCtrl', ['$scope', 'pollutionAPI', '$cookies', function ($scope, pollutionAPI, $cookies) {
	
	pollutionAPI.get_errors({useLocalAPI: true}).then(function(values) {
		
		var keys = Object.keys(values);
		var keysLength = keys.length;
		var errors_array = []
		for (var i = 0; i < keysLength; i++){
			values[keys[i]].hour = i + 1;
			errors_array.push(values[keys[i]])
		}
		$scope.errors = errors_array;
		console.log(errors_array);
		
	});

	$scope.options = {
		axes: {
			x: {key:"hour", type:"linear"},
			y: {type:'linear'}
		},
		series: [
			{y: 'avg', color: "#1a0dab", thickness: "3px"}
		],
		drawDots: true,
		zoom: true,
		drawLegend: true
	};



  }]);
