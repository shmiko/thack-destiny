angular.module('thackApp')
  .controller('step1Controller', ['$scope', '$http', 'allDataService','$location', function ($scope, $http, allDataService, $location) {
      $scope.step1Data = {};
      $scope.step1Data.noOfPersons = 0;
      $scope.step1Data.tripType;
      $scope.step1Data.budget;
      $scope.step1Data.selectedCountry = allDataService.getSelectedCountry();
      $scope.step1Data.selectedCities = allDataService.getSelectedCities();
      if(!$scope.step1Data.selectedCountry || !$scope.step1Data.selectedCities.length) {
          $location.path('/');
      }
      
      
      
      $scope.verifyEntered = function() {
          var a = false;
          if($scope.step1Data.noOfPersons && $scope.step1Data.tripType !== undefined && $scope.step1Data.budget !== undefined) {
              a = true;
          }
          return a;
      };
      $scope.nextStep = function() {
          allDataService.setTripInfo($scope.step1Data);
          $location.path('/step2');
      };
      
      $scope.persons = [1,2,3,4,5,6,7,8,9,10];
      $scope.tripTypes = ['Family', 'Party', 'Romantic', 'Leisure', 'Adventure'];
      $scope.budgets = ['Low', 'Medium', 'High', 'Luxury', 'Royal'];
      
  }]);