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

	// CHECK THAT FOR PRODUCTION ENVIRONMENT, LOCALAPI IS FALSE

	pollutionAPI.get_forecast({useLocalAPI: false}).then(function(preds) {
		$scope.predictions = prepDataForChart(preds.predictions);
		console.log($scope.predictions);
		$scope.updatedAt = new Date(preds._id);
		$scope.currently = preds.currently;
	});

 	function prepDataForChart(data) {
 		return data.map(function(each) {
 			return {x: data.indexOf(each), pollution: each.p, date: new Date(each.t_obj)};
 		}) 		
 	}


	$scope.options = {
		axes: {
			x : {key: "date", type:"date", ticksRotate: -45, ticksFormat: '%a %b %d'},
			y: {type:'linear'}
		},
		series: [
			{y: 'pollution', color: "#d62728", thickness: "4px"}
		],
		drawDots: false,
		zoom: true,
		drawLegend: false
	};

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
			min:50,
			max:100,
			color:'#ffde33'
		},{
			min:100,
			max:150,
			color:'#ff9933'
		},{
			min:150,
			max:200,
			color:'#cc0033'
		},{
			min:200,
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
