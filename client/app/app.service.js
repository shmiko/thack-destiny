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
    
    
}]);