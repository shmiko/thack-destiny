angular.module('thackApp')
  .controller('step2Controller', ['$scope', '$http', 'allDataService','$location', function ($scope, $http, allDataService, $location) {
      $scope.step2Data = {};
      $scope.step2Data.attractions = [];
        $scope.step2Data.selectedAttractions = [];
      $scope.step2Data.selectedCountry = allDataService.getSelectedCountry();
      $scope.step2Data.selectedCities = allDataService.getSelectedCities();
      if(!$scope.step2Data.selectedCountry || !$scope.step2Data.selectedCities.length) {
          $location.path('/');
      }
      
      
      $scope.getAttraction = function(cityName) {
          $http.get('https://api.foursquare.com/v2/venues/explore?client_id=M41OMVU5HNOFHNTDQWZ11MAHQLM4DUDGD0LQFA5PRGO1OG01&client_secret=AEFVQHRECZJT3ALLXTR4ZGGIFRTC22X1X522OXUCR2W2DSB0&near=' + cityName.name + '&radius=20000&section=sights&v=20130815').success(function(resp) {
                  $scope.step2Data.attractions.push({ city: cityName, data: resp.response, isOpen: false});
              $//scope.step2Data.attractions[0].isOpen = true;
              console.log($scope.step2Data.attractions);
                  
              }).error(function() {
                  console.log("failed to fetch foursquare list");
              });
      };
      for(var i in $scope.step2Data.selectedCities) {
          $scope.getAttraction($scope.step2Data.selectedCities[i]);
      }
      
      $scope.selectedAttractions = function(city, item) {
          var a = true;
          for(var i in $scope.step2Data.selectedAttractions) {
              if($scope.step2Data.selectedAttractions[i].data.venue.name === item.venue.name) {
                  a = false;
                  break;
              }
          }
          if(item.selected && a) {
              console.log($scope.step2Data.selectedAttractions);
              $scope.step2Data.selectedAttractions.push({
             city: city,
             data: item
             });
          }
                  
      }
      
      $scope.verifyEntered = function() {
          var a = true;
          
          return a;
      };
      $scope.nextStep = function() {
          allDataService.setSelectedAttractions($scope.step2Data.selectedAttractions);
          $location.path('/hotels');
      };
      
  }]);