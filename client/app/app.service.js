angular.module('thackApp')
.service('allDataService', [function() {
    
    var allData = {};
    allData.selectedCountry = "";
    
    this.getSelectedCountry = function() {
        return allData.selectedCountry;
    };
    
    this.setSelectedCountry = function(value) {
        allData.selectedCountry = value;
    };
    
    
}]);