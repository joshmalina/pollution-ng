'use strict';

/**
 * @ngdoc service
 * @name pollutionNgApp.pollutionAPI
 * @description
 * # pollutionAPI
 * Factory in the pollutionNgApp.
 */
angular.module('pollutionNgApp')
  .factory('pollutionAPI', ['$http', function ($http) {

  	var LOCAL_API = 'http://127.0.0.1:5000/forecast';
  	var PROD_API = 'http://ec2-52-91-186-157.compute-1.amazonaws.com/forecast';   
    

    function get_forecast(endpoint) {

    	var options = {
	      method: 'GET',
	      url: endpoint.useLocalAPI ? LOCAL_API : PROD_API
    	};

    	return $http(options)

    }

    return {
    	/*
    	 * return 10-day forecast
    	 * @args local: true / false, return from local or live api
		 */
    	get_forecast: function(endpoint) {
    		return get_forecast(endpoint)
		}
    }

    
  }]);
