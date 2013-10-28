var onTapControllers = angular.module("onTapControllers", []);

onTapControllers.controller("beersListController", [ "$scope", "Beer", function beersListController($scope, Beer) {
  $scope.beers = Beer.query();
}]);

onTapControllers.controller("beersDetailController", ["$scope", "$routeParams", "Beer", function beersDetailController($scope, $routeParams, Beer) {
  $scope.beer = Beer.get({id: $routeParams.id});

  $scope.setClass = function(value) {
    return value ? "active" : "inactive";
  }
}]);

onTapControllers.controller("searchController", [ "$scope", "$routeParams", "SearchBrewery", function beersListController($scope, $routeParams, SearchBrewery) {

  $scope.search = function(searchTerm) {
    $scope.searchResults = SearchBrewery.search({brewery_name: searchTerm});
  }
}]);

onTapControllers.controller('applicationController', function($scope, $navigate) {
  $scope.$navigate = $navigate;
})