angular.module('thackApp')
.service('allDataService', [function() {
    
    var allData = {};
    allData.selectedCountry = "";
    allData.selectedCityList = "";
    
    this.getSelectedCountry = function() {
        return allData.selectedCountry;
    };
    
    this.setSelectedCountry = function(value) {
        allData.selectedCountry = value;
    };
    
    this.getSelectedCities = function() {
        return allData.selectedCityList;
    };
    
    this.setSelectedCities = function(value) {
        allData.selectedCityList = value;
    };
    
    this.getTripInfo = function() {
        return {
            noOfPersons: allData.persons,
            tripType: allData.tripType,
            budget: allData.budget
        };
    };
    
    this.setTripInfo = function(value) {
        allData.persons = value.noOfPersons;
        allData.tripType = value.tripType;
        allData.budget = value.budget;
    };
    
    this.getSelectedAttractions = function() {
        return allData.attractions;
    };
    
    this.setSelectedAttractions = function(value) {
        allData.attractions = value;
    };
    
    this.getOptimalHotelLocation = function(cityName) {
        
        if(allData.attractions[cityName].length === 1) {
            return { lat: allData.attractions[cityName][0].venue.location.lat, lng: allData.attractions[cityName][0].venue.location.lng };
        }
        var middlePoint = new LatLon(allData.attractions[cityName][0].venue.location.lat, allData.attractions[cityName][0].venue.location.lng);
      for(var i in allData.attractions[cityName]) {
          var nextPoint = new LatLon(allData.attractions[cityName][i].venue.location.lat, allData.attractions[cityName][i].venue.location.lng);
          
          middlePoint = middlePoint.midpointTo(nextPoint);
      }
        
        return { lat: middlePoint.lat, lng: middlePoint.lon };
    };
    
    
    
}]);