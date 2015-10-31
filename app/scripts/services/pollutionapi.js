'use strict';

/**
 * @ngdoc service
 * @name pollutionNgApp.pollutionAPI
 * @description
 * # pollutionAPI
 * Factory in the pollutionNgApp.
 */
angular.module('pollutionNgApp')
  .factory('pollutionAPI', ['$http', '$cookies', '$q', function ($http, $cookies, $q) {

    Date.prototype.addHours = function(h){
      this.setHours(this.getHours()+h);
      return this;
    } 

    // endpoints
    var LOCAL_BASE = 'http://127.0.0.1:5000';
    var PROD_BASE = 'http://ec2-52-91-103-245.compute-1.amazonaws.com';

    // parameters for cookies and storage
    var ERROR_COOKIE = {
      'name': 'errors_available',
      'numHours' : 24
    };
        
    var ERROR_LOCAL_STORAGE_KEY = 'errors';

    var FORECAST_COOKIE = {
      'name': 'forecast_still_valid',
      'numHours': 1
    }

    var FORECAST_LOCAL_STORAGE_KEY = 'forecast';


    function call_api(endpoint, append_path) {

      var url = endpoint.useLocalAPI ? LOCAL_BASE : PROD_BASE;

      var options = {
        method: 'GET',
        url: url + append_path
      };

      return $http(options);

    }    

    function availableLocally(cookieName, localStorName) {
      return ($cookies.get(cookieName) && (typeof localStorage.getItem(localStorName) != 'undefined'));
    }

    function getLocally(localStorName) {
      return JSON.parse(localStorage.getItem(localStorName));
    }

    // should check for success and return something
    function storeLocally(cookieObj, localStor) {
      $cookies.put(cookieObj.name, true, {expires: new Date().addHours(cookieObj.numHours)});
      localStorage.setItem(localStor.name, JSON.stringify(localStor.data));
    }    

    function getData(cookie_obj, storage_key, endpoint, path) {

      var defer = $q.defer();

      if(availableLocally(cookie_obj.name, storage_key)) {

        defer.resolve(getLocally(storage_key));

      } else {

        call_api(endpoint, path).then(function(result) {

          result = result.data;

          storeLocally(cookie_obj, {'name':storage_key, 'data':result});

          defer.resolve(result);
        })
      }
      return defer.promise;
    }

    return {
    	/*
    	 * return 10-day forecast
    	 * @args local: true / false, return from local or live api
		 */
    	get_forecast: function(endpoint) {
        return getData(FORECAST_COOKIE, FORECAST_LOCAL_STORAGE_KEY, endpoint, '/getLatest');
		  },
      get_errors: function(endpoint) {
        return getData(ERROR_COOKIE, ERROR_LOCAL_STORAGE_KEY, endpoint, '/getErrors');
      }

    }

    
  }]);
