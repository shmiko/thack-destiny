angular.module('thackApp')
  .controller('mainController', ['$scope', '$http', 'allDataService','$location', function ($scope, $http, allDataService, $location) {
      $scope.step0Data = {};
      
      $scope.step0Data.selectedCountry = allDataService.getSelectedCountry();
      if(!$scope.step0Data.selectedCountry) {
          $location.path('/');
      }
      
      
  }]);