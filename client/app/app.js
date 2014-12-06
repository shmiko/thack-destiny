'use strict';

angular.module('thackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    
    $routeProvider.when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'mainController'
    })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });