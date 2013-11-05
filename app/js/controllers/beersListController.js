onTapControllers.controller("beersListController", [ 
  "$scope", 
  "$routeParams", 
  "Restangular",

  function beersListController($scope, $routeParams, Restangular) {
    promise = Restangular.one("breweries", $routeParams.beerdb_id).one("beers").get();
    promise.then(function(results) {
      $scope.beers = results;
    });
  }
]);