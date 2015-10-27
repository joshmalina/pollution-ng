'use strict';

/**
 * @ngdoc function
 * @name pollutionNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pollutionNgApp
 */
 angular.module('pollutionNgApp')
 .controller('MainCtrl', ['$scope', 'pollutionAPI', '$cookies', 'moment', '$q', function ($scope, pollutionAPI, $cookies, moment, $q) { 

 	Date.prototype.addHours = function(h){
    	this.setHours(this.getHours()+h);
    	return this;
	}	

	
	var defer = $q.defer();

	// return forecast from local storage if cookies hasn't expired (set for 1 hour)
 	if($cookies.get('forecast_still_valid') && (typeof localStorage.getItem('forecast') != 'undefined')) {
 		var getPreds = JSON.parse(localStorage.getItem('forecast')); 		
 		getPreds.predictions = prepDataForChart(getPreds.predictions);
 		defer.resolve(getPreds)	
 	} else {
 		// else call api
 		pollutionAPI.get_forecast({useLocalAPI: false}).then(function(values) {

 			var preds = values.data;
 			localStorage.setItem('forecast', JSON.stringify(preds));
 			preds.predictions = prepDataForChart(preds.predictions)

 			defer.resolve(preds);
 			
 			$cookies.put('forecast_still_valid', true, {expires: new Date().addHours(1)});
 			// update local storage of forecast
 			console.log(values.data);
 		})
 	} 	

	defer.promise.then(function(preds) {
		$scope.predictions = preds.predictions;
		$scope.updatedAt = new Date(preds._id);
		$scope.currently = preds.currently;
	})

 	function prepDataForChart(data) {
 		return data.map(function(each) {
 			return {x: data.indexOf(each), pollution: each.p, date: new Date(each.t_obj)}
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

	$scope.changeColor = function(val) {
		function between(value,min,max) {
			return(value >= min && value <= max)
		}
		var ranges = 
		[{
			min:0,
			max:50,
			color: '#009966'
		},{
			min:51,
			max:100,
			color:'#ffde33'
		},{
			min:101,
			max:150,
			color:'#ff9933'
		},{
			min:151,
			max:200,
			color:'#cc0033'
		},{
			min:201,
			max:300,
			color:'#660099',
		},{
			min:300,
			max:2000,
			color:'#7e0023'
		}];
		var rangesLength = ranges.length;
		for (var i = 0; i < rangesLength; i++){
			if(between(val, ranges[i]['min'], ranges[i]['max'])) {
				return "{'background-color': '" + ranges[i]['color'] + "'}"
			}
		}	

	}


  





  }]);
