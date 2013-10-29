var onTapControllers = angular.module("onTapControllers", []);

onTapControllers.controller("beersListController", [ 
  "$scope", 
  "$routeParams", 
  "Restangular",

  function beersListController($scope, $routeParams, Restangular) {
    promise = Restangular.one("breweries", $routeParams.beerdb_id).one("beers").get();
    promise.then(function(results) {
      console.log(results);
      $scope.beers = results;
    });
  }
]);

onTapControllers.controller("beersDetailController", [
  "$scope", 
  "$routeParams", 
  "Beer", 

  function beersDetailController($scope, $routeParams, Beer) {
    $scope.beer = Beer.get({id: $routeParams.id});

    $scope.setClass = function(value) {
      return value ? "active" : "inactive";
    }
  }
]);

onTapControllers.controller("searchController", [ 
  "$scope", 
  "$routeParams", 
  "Search",
  "Restangular",

  function searchController($scope, $routeParams, Search, Restangular) {
  
    $scope.$watch("searchTerm", function(searchString) {
      $scope.isSearching = true;

      setTimeout(function() {
        if(searchString === $scope.searchTerm && searchString !== "" && typeof searchString !== "undefined") {
          promise = Restangular.one("search").one("all", searchString).get();
          promise.then(function(results) {
            $scope.searchResults = results;
            $scope.isSearching = false;
          });
        }
      }, 1000);
    });
  }
]);

onTapControllers.controller('applicationController', function($scope, $navigate) {
  $scope.$navigate = $navigate;
})