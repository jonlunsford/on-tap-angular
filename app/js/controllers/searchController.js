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