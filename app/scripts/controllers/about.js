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
	
  	// CHECK CHAT LOCAL API IS FALSE FOR PROD ENV

	pollutionAPI.get_errors({useLocalAPI: false}).then(function(returned) {

		console.log(returned.raw_errors)

		$scope.raw_errors = returned.raw_errors;

		var values = returned.ave_errors;
		
		var keys = Object.keys(values);
		var keysLength = keys.length;
		var errors_array = [];
		for (var i = 0; i < keysLength; i++){
			values[keys[i]].hour = i + 1;
			errors_array.push(values[keys[i]])
		}
		$scope.errors = errors_array;
		console.log(errors_array);

		var values_by_val = returned.ave_errors_by_val;

		var keys_by_val = Object.keys(values_by_val);
		var keys_by_valLength = keys_by_val.length;
		var ave_errors_by_val_array = [];
		for (var i = 0; i < keys_by_valLength; i++){
			values_by_val[keys_by_val[i]].index_val = parseInt(keys_by_val[i]);
			ave_errors_by_val_array.push(values_by_val[keys_by_val[i]])
		}
		$scope.errors_by_val = ave_errors_by_val_array;
		console.log(ave_errors_by_val_array);
		
	});

	$scope.options = {
		axes: {
			x: {key:"hour", type:"linear"},
			y: {type:'linear'}
		},
		series: [
			{y: 'avg', color: "#1a0dab", thickness: "3px"}
		],
		drawDots: false,
		zoom: true,
		drawLegend: true
	};

	$scope.options_by_val = {
		axes: {
			x: {key:"index_val", type:"linear"},
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
