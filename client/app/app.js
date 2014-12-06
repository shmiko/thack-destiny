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
    .when('/step0', {
        templateUrl: 'app/step0/step0.html',
        controller: 'step0Controller'
    })
    .when('/step1', {
        templateUrl: 'app/step1/step1.html',
        controller: 'step1Controller'
    })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });