'use strict';

/**
 * @ngdoc directive
 * @name pollutionNgApp.directive:linearChart
 * @description
 * # linearChart
 */
 angular.module('pollutionNgApp')
 .directive('linearChart', ['d3Service', '$q', 'pollutionAPI', function (d3Service, $q, pollutionAPI) {
 	return {
 		template: '<svg width="700" height="200"></svg>',
 		restrict: 'EA', 		
 		link: function (scope, elem, attrs) {

 			d3Service.d3().then(function(d3) {

 				pollutionAPI.then(function(data) {

 					var datums = data.data.predictions;

 					
 				})

			});

		}
	};
}]);
