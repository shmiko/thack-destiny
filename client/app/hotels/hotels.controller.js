angular.module('thackApp')
  .controller('hotelsController', ['$scope', '$http', 'allDataService','$location', function ($scope, $http, allDataService, $location) {
      $scope.hotelData = {};
      $scope.hotelData.attractions = [];
      $scope.hotelData.selectedAttractions = {};
      $scope.hotelData.selectedCountry = allDataService.getSelectedCountry();
      $scope.hotelData.selectedCities = allDataService.getSelectedCities();
      $scope.hotelData.addlData = allDataService.getTripInfo();
      $scope.hotelData.attractions = allDataService.getSelectedAttractions();
      $scope.hotelData.chosenHotel;
      var algoData = [];
      $scope.algoData = algoData;
      if(!$scope.hotelData.selectedCountry || !$scope.hotelData.selectedCities.length) {
          $location.path('/');
      }
      
      for(var i in $scope.hotelData.selectedCities) {
          var cityName = $scope.hotelData.selectedCities[i].name;
          var loc = allDataService.getOptimalHotelLocation(cityName);
          
          algoData.push({
              city: cityName,
              loc: loc,
              checkin: $scope.hotelData.selectedCities[i].startDate,
              checkout: $scope.hotelData.selectedCities[i].endDate,
              noOfPersons: $scope.hotelData.addlData.noOfPersons,
              budget: $scope.hotelData.addlData.budget,
              tripType: $scope.hotelData.addlData.tripType,
              attractions: $scope.hotelData.attractions[cityName]
          });
      };
      
      //request for hotels
      for(var i in algoData) {
          var reqDate = function(algo) {
              var checkin = algo.checkin.getFullYear() + '-' + ("0" + (algo.checkin.getMonth() + 1)).slice(-2) + '-' + ("0" + algo.checkin.getDate()).slice(-2);
              var checkout = algo.checkout.getFullYear() + '-' +("0" + (algo.checkout.getMonth() + 1)).slice(-2) + '-' + ("0" + algo.checkout.getDate()).slice(-2);
              $http.get('/api/amadeus/hotels/?check_in=' + checkin + '&check_out=' + checkout + '&latitude='+ algo.loc.lat + '&longitude=' + algo.loc.lng).then(function(data) {
                  algo.hotels = data.data.results;
                  console.log(algo.hotels);
                  return $http.get('/api/amadeus/airport/?latitude='+ algo.loc.lat + '&longitude=' + algo.loc.lng);
              }).then(function(data) {
                  if(data.data.length) {
                      algo.nearestAirport = data.data[0];
                  } else {
                      console.log("No airports nearby");
                  }
                   
                  return $http.get('/api/amadeus/nearestrail/?latitude='+ algo.loc.lat + '&longitude=' + algo.loc.lng);
              }).then(function(data) {
                  if(data.data && data.data.length) {
                      algo.airportNearestRail = data.data[0].station_label;
                  }
                  
                  
                  var checkin = algo.checkin.getFullYear() + '-' + ("0" + (algo.checkin.getMonth() + 1)).slice(-2) + '-' + ("0" + algo.checkin.getDate()).slice(-2);
                  
                  return $http.get('/api/amadeus/cabsearch/?latitude='+ algo.loc.lat + '&longitude=' + algo.loc.lng + '&date=' + checkin);
              }).then(function(data) {
                      algo.airportCabPickup = data.data.results;
                  console.log(algo);
                });
              
              
              
              
              
          }(algoData[i]);
      }
      
      console.log(algoData);
      $scope.nextStep = function() {
          allDataService.setSelectedAttractions($scope.step2Data.selectedAttractions);
          $location.path('/hotels');
      };
      
      $scope.hotelChosen = function(algo, index) {
          algo.travel = {};
          var loc = new LatLon(algo.hotels[index].location.latitude, algo.hotels[index].location.longitude);
          for(var i in algo.attractions) {
              var l = new LatLon(algo.attractions[i].venue.location.lat, algo.attractions[i].venue.location.lng);
              algo.attractions[i].distanceTo = l.distanceTo(loc);
              
              var fn = function(attr) {
                  
                  var checkin = algo.checkin.getFullYear() + '-' + ("0" + (algo.checkin.getMonth() + 1)).slice(-2) + '-' + ("0" + algo.checkin.getDate()).slice(-2);
                  $http.get('/api/amadeus/cabsearch/?latitude='+ loc.lat + '&longitude=' + loc.lon + '&date=' + checkin).then(function(resp) {
                
                if(resp.data && resp.data.results.length) {
                    attr.cabCharge = resp.data.results[0].cars[0].estimated_total.amount + " USD / day";
                } else {
                    attr.cabCharge = "N/A";
                }
                
                      return $http.get('/api/amadeus/nearestrail/?latitude='+ attr.venue.location.lat + '&longitude=' + attr.venue.location.lng);
                
            }).then(function(data) {
                      if(data.data) {
                          attr.railTravel = data.data[0].station_label;
                      } else {
                          attr.railTravel = "N/A";
                      }
                  });
                  
              }(algo.attractions[i]);
          }
          
          
                  
            
      };
      
  }]);