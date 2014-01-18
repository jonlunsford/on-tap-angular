onTapControllers.controller("searchController", [
  "$scope",
  "$routeParams",
  "Restangular",
  "$navigate",
  "storage",

  function searchController($scope, $routeParams, Restangular, $navigate, storage) {
    $scope.isSearching = false;
    $scope.$navigate = $navigate;
    $scope.isSearchView = true;

    $scope.$watch("searchTerm", function(searchString) {
      console.log("HELLO")

      setTimeout(function() {
        if(searchString === $scope.searchTerm && searchString !== "" && typeof searchString !== "undefined") {
          $scope.isSearching = true;
          searchRequest = Restangular.one("search").one("all", searchString).get();
          searchRequest.then(function(results) {
            $scope.searchResults = results;
            $scope.isSearching = false;
          });
        }
      }, 1000);
    });

    $scope.getResource = function(type, id) {
      $scope.type = typeof type === "undefined" ? "beer" : type;
      $scope.brewerydb_id = id;

      getRequest = Restangular.one("search").one($scope.type, id).get();
      getRequest.then(function(result) {

        if($scope.type === "brewery") {
          storage.set("last_brewery_name", result.name);
        } else {
          storage.remove("last_brewery_name");
        }

        $scope.result = result;
        $navigate.go('/search/' + $scope.type + '/' + id);
      });
    };

    $scope.getBreweryBeers = function(id) {
      $scope.title = storage.get("last_brewery_name");
      $scope.hiddenClass = "hidden";
      $scope.isSearchView = false;
      getRequest = Restangular.one("search", "brewery").one(id, "beers").get();
      getRequest.then(function(results) {
        $scope.searchResults = results;
      });
    };

    if($routeParams.brewerydb_id) {
      $scope.type = window.location.hash.indexOf("beer") > 0 ? "beer" : "brewery";
      
      if(window.location.hash.indexOf("beers") > 0) {
        $scope.getBreweryBeers($routeParams.brewerydb_id);
      } else {
        $scope.getResource($scope.type, $routeParams.brewerydb_id);
      }
    }
  }
]);