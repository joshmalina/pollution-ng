'use strict';

/**
 * @ngdoc overview
 * @name pollutionNgApp
 * @description
 * # pollutionNgApp
 *
 * Main module of the application.
 */
angular
  .module('pollutionNgApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'angular-loading-bar',
    'n3-line-chart',
    'googlechart'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });    
  });

