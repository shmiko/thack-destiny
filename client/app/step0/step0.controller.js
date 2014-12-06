angular.module('thackApp')
  .controller('step0Controller', ['$scope', '$http', 'allDataService','$location', function ($scope, $http, allDataService, $location) {
      $scope.step0Data = {};
      $scope.step0Data.selectedCity = "";
      $scope.step0Data.cityList = [];
      $scope.step0Data.selectedCityList = [];
      $scope.opened0 = [];
      $scope.opened1 = [];
      $scope.step0Data.selectedCountry = allDataService.getSelectedCountry();
      if(!$scope.step0Data.selectedCountry) {
          $location.path('/');
      }
      
      $scope.fetchCities = function() {
          $scope.step0Data.cityList = [];
              var req = {
                  method: 'GET',
                  url: '/api/things/' + $scope.step0Data.selectedCountry,
                  headers: {
                      "Access-Control-Allow-Origin": "*"
                  }
              };
              $http(req).success(function(resp) {
                  console.log(resp);
                  $scope.step0Data.cityList = resp;
                  /*var pred = resp.predictions;
                  for(var i in pred) {
                      var len = pred.terms.length;
                      if(pred.terms[len-1] === $scope.step0Data.selectedCountry) {
                          $scope.step0Data.cityList.push(pred.terms[0]);
                      }
                  }*/
              }).error(function() {
                  console.log("failed to fetch city list");
              });
      };
      $scope.fetchCities();
      
      $scope.citySelected = function() {
          var a = true
          for(var j in $scope.step0Data.selectedCityList) {
              if($scope.step0Data.selectedCityList[j].name === $scope.step0Data.selectedCity) {
                  a=  false;
                  break;
              }
          }
          
          if(a && $scope.step0Data.cityList.indexOf($scope.step0Data.selectedCity) !== -1) {
             $scope.step0Data.selectedCityList.push({
                 name: $scope.step0Data.selectedCity,
                 startDate: undefined,
                 endDate: undefined,
                 opened0: false,
                 opened1: false
             });
          }
      };
      
      $scope.open = function(event, index, c) {
        event.preventDefault();
        event.stopPropagation();

        $scope.step0Data.selectedCityList[index]['opened' + c] = true;
      };
      
      $scope.isOpened = function(index, c) {
          return $scope['opened' + c][index];
      };
      
      $scope.verifyEntered = function() {
          var a = true;
          for(var j in $scope.step0Data.selectedCityList) {
              if(!$scope.step0Data.selectedCityList[j].startDate || !$scope.step0Data.selectedCityList[j].endDate) {
                  a=  false;
                  break;
              }
          }
          return a && $scope.step0Data.selectedCityList.length;
      };
      $scope.nextStep = function() {
          allDataService.setSelectedCities($scope.step0Data.selectedCityList);
          $location.path('/step1');
      };
      
  }]);