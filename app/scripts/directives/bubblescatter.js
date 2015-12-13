'use strict';

/**
 * @ngdoc directive
 * @name pollutionNgApp.directive:bubbleScatter
 * @description
 * # bubbleScatter
 */
 angular.module('pollutionNgApp')
 .directive('bubbleScatter', ['d3Service', '$http', function(d3Service, $http) {
 	return {
 		restrict: 'EA',
 		scope: {},
 		link: function(scope, element, attrs) {
 			d3Service.d3().then(function(d3) {

 			var w = 940,
			    h = 300,
			    pad = 20,
			    left_pad = 100,
			    Data_url = '/data.json';

		    var svg = d3.select("#punchcard")
		        .append("svg")
		        .attr("width", w)
		        .attr("height", h);


			});
 		}};
 	}]);


