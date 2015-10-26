'use strict';

/**
 * @ngdoc function
 * @name pollutionNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pollutionNgApp
 */
 angular.module('pollutionNgApp')
 .controller('MainCtrl', ['$scope', 'pollutionAPI', '$cookies', 'moment', function ($scope, pollutionAPI, $cookies, moment) { 

 	Date.prototype.addHours = function(h){
    	this.setHours(this.getHours()+h);
    	return this;
	}	

	var predictions = null;

	// return forecast from local storage if cookies hasn't expired (set for 1 hour)
 	if($cookies.get('forecast_still_valid') && (typeof localStorage.getItem('forecast') != 'undefined')) {
 		predictions = JSON.parse(localStorage.getItem('forecast'));
 		$scope.predictions = predictions;
 		$scope.data = prepDataForChart(predictions);
 		//console.log($scope.data);
 		console.log($scope.predictions);
 	} else {
 		// else call api
 		pollutionAPI.get_forecast({useLocalAPI: true}).then(function(values) {
 			var predictions = values.data.predictions;
 			// pass to view
 			$scope.predictions = predictions;
 			// set a cookie for an hour
 			$cookies.put('forecast_still_valid', true, {expires: new Date().addHours(1)})
 			// update local storage of forecast
 			localStorage.setItem('forecast', JSON.stringify(predictions));
 			// data for chart -- not DRY
 			$scope.data = prepDataForChart(predictions);
 			console.log(values.data)

 		})
 	}

 	function prepDataForChart(data) {
 		return data.map(function(each) {
 			return {x: data.indexOf(each), pollution: each.p, date: new Date(each.t_raw)}
 		}) 		
 	}


	$scope.options = {
		axes: {
			x : {key: "date", type:"date"},
			y: {type:'linear'}
		},
		series: [
			{y: 'pollution', color: "#d62728", thickness: "4px"}
		],
		drawDots: false,
		zoom: true	
	}


  





  }]);
